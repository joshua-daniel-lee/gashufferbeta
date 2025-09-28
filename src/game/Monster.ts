import { Scene } from 'phaser';
import { Player } from './Player';

export enum MonsterState {
    IDLE = 'idle',
    PATROL = 'patrol', 
    CHASE = 'chase',
    ATTACK = 'attack',
    DEATH = 'death'
}

export abstract class Monster extends Phaser.GameObjects.Sprite {
    protected player: Player;
    protected currentState: MonsterState = MonsterState.IDLE;
    
    // Monster properties
    protected health: number = 1;
    protected maxHealth: number = 1;
    protected speed: number = 80; // Base movement speed
    protected detectionRange: number = 100; // How far can detect player
    protected attackRange: number = 32; // How close to attack
    protected isDying: boolean = false;
    
    // AI properties
    protected stateTimer: number = 0;
    protected lastStateChange: number = 0;
    protected patrolPoints: Phaser.Math.Vector2[] = [];
    protected currentPatrolIndex: number = 0;
    protected patrolDirection: number = 1;
    
    // Flashlight vulnerability
    protected flashlightExposureTime: number = 0;
    protected flashlightDeathTime: number = 2000; // 2 seconds to kill by default
    protected isBeingLit: boolean = false;
    
    // Animation properties
    protected animationTimer: number = 0;
    protected currentFrame: number = 0;
    
    constructor(scene: Scene, x: number, y: number, texture: string, player: Player) {
        super(scene, x, y, texture);
        
        this.player = player;
        
        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this as any);
        
        // Set up physics body
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setSize(24, 24, true); // Collision box
        
        this.setScale(2); // 2x scale for visibility
        
        // Initialize AI
        this.setupBehavior();
    }
    
    protected abstract setupBehavior(): void;
    protected abstract updateBehavior(delta: number): void;
    
    update(time: number, delta: number): void {
        if (this.isDying) {
            this.handleDeath(delta);
            return;
        }
        
        this.checkFlashlightExposure();
        this.updateBehavior(delta);
        this.updateAnimations(delta);
        this.handleFlashlightDamage(delta);
    }
    
    private checkFlashlightExposure(): void {
        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.x, this.y, 
            this.player.x, this.player.y
        );
        
        // Check if player's flashlight is active and monster is within range and facing player
        if (this.player.isFlashlightActive() && distanceToPlayer <= 120) {
            // Simple line-of-sight check (can be improved with raycasting)
            const angle = Phaser.Math.Angle.Between(
                this.player.x, this.player.y,
                this.x, this.y
            );
            
            // Assume flashlight has 60-degree cone (simplified)
            this.isBeingLit = true;
        } else {
            this.isBeingLit = false;
        }
    }
    
    private handleFlashlightDamage(delta: number): void {
        if (this.isBeingLit) {
            this.flashlightExposureTime += delta;
            
            // Flash white when being exposed
            if (Math.floor(this.flashlightExposureTime / 100) % 2 === 0) {
                this.setTint(0xffffff);
            } else {
                this.clearTint();
            }
            
            // Die after sufficient exposure
            if (this.flashlightExposureTime >= this.flashlightDeathTime) {
                this.takeDamage(this.health); // Kill instantly
            }
        } else {
            this.flashlightExposureTime = Math.max(0, this.flashlightExposureTime - delta * 0.5); // Slow recovery
            this.clearTint();
        }
    }
    
    takeDamage(amount: number = 1): boolean {
        this.health = Math.max(0, this.health - amount);
        
        if (this.health <= 0 && !this.isDying) {
            this.startDeath();
            return true;
        }
        
        return false;
    }
    
    private startDeath(): void {
        this.isDying = true;
        this.currentState = MonsterState.DEATH;
        
        // Stop movement
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(0, 0);
        
        // Death animation/effect
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            scaleX: this.scaleX * 1.5,
            scaleY: this.scaleY * 1.5,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.destroy();
            }
        });
    }
    
    private handleDeath(delta: number): void {
        // Override in specific monsters for death behavior
    }
    
    protected abstract updateAnimations(delta: number): void;
    
    // Utility methods for AI
    protected getDistanceToPlayer(): number {
        return Phaser.Math.Distance.Between(
            this.x, this.y,
            this.player.x, this.player.y
        );
    }
    
    protected getAngleToPlayer(): number {
        return Phaser.Math.Angle.Between(
            this.x, this.y,
            this.player.x, this.player.y
        );
    }
    
    protected canSeePlayer(): boolean {
        const distance = this.getDistanceToPlayer();
        return distance <= this.detectionRange;
        // TODO: Add proper line-of-sight checking with raycasting
    }
    
    protected moveTowards(targetX: number, targetY: number, speed: number): void {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
        
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
    }
    
    protected moveAlongPatrol(): void {
        if (this.patrolPoints.length === 0) return;
        
        const targetPoint = this.patrolPoints[this.currentPatrolIndex];
        const distance = Phaser.Math.Distance.Between(this.x, this.y, targetPoint.x, targetPoint.y);
        
        if (distance < 16) { // Reached patrol point
            // Move to next point
            this.currentPatrolIndex += this.patrolDirection;
            
            // Bounce between patrol points
            if (this.currentPatrolIndex >= this.patrolPoints.length) {
                this.currentPatrolIndex = this.patrolPoints.length - 2;
                this.patrolDirection = -1;
            } else if (this.currentPatrolIndex < 0) {
                this.currentPatrolIndex = 1;
                this.patrolDirection = 1;
            }
        } else {
            this.moveTowards(targetPoint.x, targetPoint.y, this.speed);
        }
    }
    
    protected setMonsterState(newState: MonsterState): void {
        if (this.currentState !== newState) {
            this.currentState = newState;
            this.lastStateChange = Date.now();
            this.stateTimer = 0;
        }
    }
    
    protected setPatrolPoints(points: Phaser.Math.Vector2[]): void {
        this.patrolPoints = points;
        this.currentPatrolIndex = 0;
        this.patrolDirection = 1;
    }
    
    // Collision with player
    collideWithPlayer(): void {
        if (!this.isDying && this.currentState !== MonsterState.DEATH) {
            const damaged = this.player.takeDamage(1);
            
            if (damaged) {
                // Player died - handle game over
                console.log('Player died!');
            }
        }
    }
    
    // Public getters
    getCurrentState(): MonsterState { return this.currentState; }
    getHealth(): number { return this.health; }
    isDead(): boolean { return this.isDying || this.health <= 0; }
    isExposedToFlashlight(): boolean { return this.isBeingLit; }
}
