import { Scene } from 'phaser';
import { Monster, MonsterState } from '../Monster';
import { Player } from '../Player';

export class Poltergeist extends Monster {
    private chaosTimer: number = 0;
    private nextDirectionChange: number = 0;
    private currentDirection: Phaser.Math.Vector2;
    private throwingObjects: Phaser.GameObjects.Image[] = [];
    private throwCooldown: number = 0;
    private energyLevel: number = 4; // 0-4 energy states
    
    constructor(scene: Scene, x: number, y: number, player: Player) {
        super(scene, x, y, 'poltergeist_energy_0', player);
        
        this.currentDirection = new Phaser.Math.Vector2(1, 0);
        
        // Poltergeist-specific properties
        this.speed = 90; // Moderate speed but erratic
        this.detectionRange = 200; // Very high detection range
        this.flashlightDeathTime = 4000; // Most resistant to flashlight
        this.health = 2; // Takes multiple hits
        
        // Set initial state
        this.setMonsterState(MonsterState.PATROL);
        
        // Create floating objects around poltergeist
        this.createFloatingObjects();
    }
    
    protected setupBehavior(): void {
        // Poltergeists don't follow traditional patrol routes
        // They move chaotically around their spawn area
        this.generateRandomDirection();
    }
    
    protected updateBehavior(delta: number): void {
        this.stateTimer += delta;
        this.chaosTimer += delta;
        this.throwCooldown = Math.max(0, this.throwCooldown - delta);
        
        const distanceToPlayer = this.getDistanceToPlayer();
        const canSeePlayer = this.canSeePlayer();
        
        switch (this.currentState) {
            case MonsterState.PATROL:
                this.handlePatrolState(canSeePlayer, distanceToPlayer);
                break;
                
            case MonsterState.CHASE:
                this.handleChaseState(canSeePlayer, distanceToPlayer);
                break;
                
            case MonsterState.ATTACK:
                this.handleAttackState(distanceToPlayer);
                break;
                
            case MonsterState.DEATH:
                // Death is handled in base class
                break;
        }
        
        // Update chaotic movement
        this.updateChaoticMovement(delta);
        
        // Update floating objects
        this.updateFloatingObjects(delta);
        
        // Random object throwing
        if (canSeePlayer && this.throwCooldown <= 0 && distanceToPlayer < 150) {
            this.throwObject();
            this.throwCooldown = 2000 + Math.random() * 3000; // 2-5 second cooldown
        }
    }
    
    private handlePatrolState(canSeePlayer: boolean, distanceToPlayer: number): void {
        if (canSeePlayer) {
            this.setMonsterState(MonsterState.CHASE);
            this.energyLevel = 4; // Maximum energy when chasing
        }
        
        // Chaotic patrol movement
        this.performChaoticMovement();
    }
    
    private handleChaseState(canSeePlayer: boolean, distanceToPlayer: number): void {
        if (!canSeePlayer && distanceToPlayer > this.detectionRange) {
            // Lost player
            this.setMonsterState(MonsterState.PATROL);
            this.energyLevel = 2; // Reduce energy
            return;
        }
        
        if (distanceToPlayer <= this.attackRange * 2) {
            // Close enough for concentrated attack
            this.setMonsterState(MonsterState.ATTACK);
        } else {
            // Move towards player with chaotic patterns
            this.moveTowardsPlayerChaotically();
        }
    }
    
    private handleAttackState(distanceToPlayer: number): void {
        // Intense energy burst during attack
        this.energyLevel = 4;
        
        if (this.stateTimer > 1500) { // 1.5 second attack burst
            if (distanceToPlayer <= this.detectionRange) {
                this.setMonsterState(MonsterState.CHASE);
            } else {
                this.setMonsterState(MonsterState.PATROL);
            }
        }
        
        // Spin and create chaos during attack
        this.performAttackChaos();
    }
    
    private updateChaoticMovement(delta: number): void {
        // Change direction randomly
        if (this.chaosTimer >= this.nextDirectionChange) {
            this.generateRandomDirection();
            this.nextDirectionChange = 500 + Math.random() * 2000; // 0.5-2.5 seconds
            this.chaosTimer = 0;
        }
    }
    
    private generateRandomDirection(): void {
        const angle = Math.random() * Math.PI * 2;
        this.currentDirection.set(Math.cos(angle), Math.sin(angle));
    }
    
    private performChaoticMovement(): void {
        // Add some randomness to movement
        const randomOffset = Math.random() * 0.5 - 0.25;
        const body = this.body as Phaser.Physics.Arcade.Body;
        
        body.setVelocity(
            this.currentDirection.x * this.speed + randomOffset * 50,
            this.currentDirection.y * this.speed + randomOffset * 50
        );
    }
    
    private moveTowardsPlayerChaotically(): void {
        // Move towards player but with chaotic variations
        const angleToPlayer = this.getAngleToPlayer();
        const chaos = Math.random() * Math.PI - Math.PI/2; // +/- 90 degrees chaos
        const chaoticAngle = angleToPlayer + chaos * 0.3; // Reduce chaos slightly
        
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(
            Math.cos(chaoticAngle) * this.speed,
            Math.sin(chaoticAngle) * this.speed
        );
    }
    
    private performAttackChaos(): void {
        // Rapid spinning during attack
        const spinSpeed = 200;
        const angle = (this.stateTimer / 100) % (Math.PI * 2);
        
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(
            Math.cos(angle) * spinSpeed,
            Math.sin(angle) * spinSpeed
        );
    }
    
    private createFloatingObjects(): void {
        // Create floating objects around the poltergeist
        const objectCount = 3;
        for (let i = 0; i < objectCount; i++) {
            // Create simple white rectangles to represent floating objects
            const obj = this.scene.add.rectangle(this.x, this.y, 8, 8, 0xffffff);
            obj.setAlpha(0.8);
            this.throwingObjects.push(obj as any);
        }
    }
    
    private updateFloatingObjects(delta: number): void {
        // Update positions of floating objects around poltergeist
        this.throwingObjects.forEach((obj, index) => {
            if (!obj || !obj.active) return;
            
            const angle = (Date.now() / 500 + index * (Math.PI * 2 / this.throwingObjects.length)) % (Math.PI * 2);
            const radius = 30 + Math.sin(Date.now() / 200 + index) * 10;
            
            obj.x = this.x + Math.cos(angle) * radius;
            obj.y = this.y + Math.sin(angle) * radius;
            
            // Fade objects based on energy level
            obj.setAlpha(0.3 + (this.energyLevel / 4) * 0.5);
        });
    }
    
    private throwObject(): void {
        // Find an available floating object to throw
        const availableObj = this.throwingObjects.find(obj => obj && obj.active);
        if (!availableObj) return;
        
        // Calculate throw direction towards player
        const angle = this.getAngleToPlayer();
        const throwSpeed = 200;
        
        // Animate object flying towards player
        this.scene.tweens.add({
            targets: availableObj,
            x: this.player.x + (Math.random() - 0.5) * 64, // Some inaccuracy
            y: this.player.y + (Math.random() - 0.5) * 64,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                // Return object to floating around poltergeist
                // Object will be repositioned in updateFloatingObjects
            }
        });
    }
    
    protected updateAnimations(delta: number): void {
        this.animationTimer += delta;
        
        // Update energy level based on state
        switch (this.currentState) {
            case MonsterState.PATROL:
                this.energyLevel = Math.max(1, this.energyLevel - 0.01);
                break;
            case MonsterState.CHASE:
                this.energyLevel = Math.min(4, this.energyLevel + 0.02);
                break;
            case MonsterState.ATTACK:
                this.energyLevel = 4;
                break;
        }
        
        // Faster animation based on energy level
        const animationSpeed = 800 - (this.energyLevel * 150); // Faster when more energetic
        
        // Cycle through energy animation frames
        if (this.animationTimer >= animationSpeed) {
            this.animationTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % 4; // 4 energy frames
            
            if (this.currentState === MonsterState.ATTACK) {
                this.setTexture('poltergeist_throw');
            } else {
                this.setTexture(`poltergeist_energy_${this.currentFrame}`);
            }
        }
        
        // Handle flashlight exposure flashing (from base class)
        if (this.isExposedToFlashlight()) {
            // Base class handles the flashing white effect
        }
    }
    
    // Override collision to be extremely chaotic
    collideWithPlayer(): void {
        // Poltergeists are the most dangerous
        super.collideWithPlayer();
        
        // Burst of energy when hitting player
        this.setMonsterState(MonsterState.ATTACK);
        this.energyLevel = 4;
    }
    
    // Clean up floating objects when destroyed
    destroy(): void {
        this.throwingObjects.forEach(obj => {
            if (obj && obj.destroy) {
                obj.destroy();
            }
        });
        super.destroy();
    }
}
