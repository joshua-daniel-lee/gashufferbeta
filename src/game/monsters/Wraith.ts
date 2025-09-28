import { Scene } from 'phaser';
import { Monster, MonsterState } from '../Monster';
import { Player } from '../Player';

export class Wraith extends Monster {
    private pursuitStartTime: number = 0;
    private maxPursuitTime: number = 8000; // 8 seconds max pursuit
    private lastPlayerPosition: Phaser.Math.Vector2;
    private searchTimer: number = 0;
    
    constructor(scene: Scene, x: number, y: number, player: Player) {
        super(scene, x, y, 'wraith_move_0', player);
        
        this.lastPlayerPosition = new Phaser.Math.Vector2();
        
        // Wraith-specific properties
        this.speed = 120; // Fast, aggressive movement
        this.detectionRange = 150; // High detection range
        this.flashlightDeathTime = 3000; // More resistant to flashlight
        
        // Set initial state
        this.setMonsterState(MonsterState.PATROL);
    }
    
    protected setupBehavior(): void {
        // Set up patrol route - wraiths cover more ground
        const patrolDistance = 150;
        this.setPatrolPoints([
            new Phaser.Math.Vector2(this.x - patrolDistance, this.y),
            new Phaser.Math.Vector2(this.x + patrolDistance, this.y),
            new Phaser.Math.Vector2(this.x, this.y - patrolDistance),
            new Phaser.Math.Vector2(this.x, this.y + patrolDistance)
        ]);
    }
    
    protected updateBehavior(delta: number): void {
        this.stateTimer += delta;
        this.searchTimer += delta;
        
        const distanceToPlayer = this.getDistanceToPlayer();
        const canSeePlayer = this.canSeePlayer();
        
        switch (this.currentState) {
            case MonsterState.PATROL:
                this.handlePatrolState(canSeePlayer);
                break;
                
            case MonsterState.CHASE:
                this.handleChaseState(canSeePlayer, distanceToPlayer, delta);
                break;
                
            case MonsterState.ATTACK:
                this.handleAttackState(distanceToPlayer);
                break;
                
            case MonsterState.DEATH:
                // Death is handled in base class
                break;
        }
    }
    
    private handlePatrolState(canSeePlayer: boolean): void {
        if (canSeePlayer) {
            // Detected player - begin aggressive pursuit
            this.setMonsterState(MonsterState.CHASE);
            this.pursuitStartTime = Date.now();
            this.lastPlayerPosition.set(this.player.x, this.player.y);
        } else {
            // Continue patrolling
            this.moveAlongPatrol();
        }
    }
    
    private handleChaseState(canSeePlayer: boolean, distanceToPlayer: number, delta: number): void {
        const pursuitDuration = Date.now() - this.pursuitStartTime;
        
        if (canSeePlayer) {
            // Update last known player position
            this.lastPlayerPosition.set(this.player.x, this.player.y);
            
            if (distanceToPlayer <= this.attackRange) {
                // Close enough to attack
                this.setMonsterState(MonsterState.ATTACK);
            } else {
                // Move towards player aggressively
                this.moveTowards(this.player.x, this.player.y, this.speed);
            }
        } else {
            // Lost sight of player - search last known position
            const distanceToLastKnown = Phaser.Math.Distance.Between(
                this.x, this.y,
                this.lastPlayerPosition.x, this.lastPlayerPosition.y
            );
            
            if (distanceToLastKnown > 16) {
                // Move to last known position
                this.moveTowards(this.lastPlayerPosition.x, this.lastPlayerPosition.y, this.speed * 0.7);
            } else {
                // Search pattern around last known position
                this.performSearchPattern();
            }
        }
        
        // Give up pursuit after max time
        if (pursuitDuration > this.maxPursuitTime) {
            this.setMonsterState(MonsterState.PATROL);
        }
    }
    
    private handleAttackState(distanceToPlayer: number): void {
        // Attack for a brief moment
        if (this.stateTimer > 500) { // 0.5 second attack
            if (distanceToPlayer <= this.attackRange) {
                // Still in range - continue chasing
                this.setMonsterState(MonsterState.CHASE);
            } else {
                // Player escaped - return to chase
                this.setMonsterState(MonsterState.CHASE);
            }
        }
        
        // Stop movement during attack
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(0, 0);
    }
    
    private performSearchPattern(): void {
        // Simple search pattern - move in expanding circles
        const searchRadius = 50;
        const angle = (this.searchTimer / 100) % (Math.PI * 2);
        const targetX = this.lastPlayerPosition.x + Math.cos(angle) * searchRadius;
        const targetY = this.lastPlayerPosition.y + Math.sin(angle) * searchRadius;
        
        this.moveTowards(targetX, targetY, this.speed * 0.5);
    }
    
    protected updateAnimations(delta: number): void {
        this.animationTimer += delta;
        
        // Faster animation during chase/attack
        let animationSpeed = 600; // Normal speed
        if (this.currentState === MonsterState.CHASE) {
            animationSpeed = 300; // Faster when chasing
        } else if (this.currentState === MonsterState.ATTACK) {
            animationSpeed = 200; // Very fast when attacking
        }
        
        // Cycle through movement animation frames
        if (this.animationTimer >= animationSpeed) {
            this.animationTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % 4; // 4 wraith movement frames
            
            if (this.currentState === MonsterState.ATTACK) {
                this.setTexture('wraith_attack');
            } else {
                this.setTexture(`wraith_move_${this.currentFrame}`);
            }
        }
        
        // Handle flashlight exposure flashing (from base class)
        if (this.isExposedToFlashlight()) {
            // Base class handles the flashing white effect
        }
    }
    
    // Override collision to be very aggressive
    collideWithPlayer(): void {
        // Wraiths are dangerous and aggressive
        super.collideWithPlayer();
        
        // Brief attack state when hitting player
        if (this.currentState !== MonsterState.ATTACK) {
            this.setMonsterState(MonsterState.ATTACK);
        }
    }
    
    // Override canSeePlayer for better detection
    protected canSeePlayer(): boolean {
        const distance = this.getDistanceToPlayer();
        
        // Wraiths have better "sight" and can detect through some obstacles
        if (distance <= this.detectionRange) {
            return true;
        }
        
        return false;
    }
}
