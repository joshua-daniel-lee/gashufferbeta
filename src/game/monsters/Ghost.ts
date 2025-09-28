import { Scene } from 'phaser';
import { Monster, MonsterState } from '../Monster';
import { Player } from '../Player';

export class Ghost extends Monster {
    private floatingOffset: number = 0;
    private floatingSpeed: number = 2; // Floating animation speed
    private originalY: number;
    
    constructor(scene: Scene, x: number, y: number, player: Player) {
        super(scene, x, y, 'ghost_float_0', player);
        
        this.originalY = y;
        
        // Ghost-specific properties
        this.speed = 60; // Slow, predictable movement
        this.detectionRange = 80; // Lower detection range (not aggressive)
        this.flashlightDeathTime = 2000; // Standard flashlight vulnerability
        
        // Set initial state
        this.setMonsterState(MonsterState.PATROL);
    }
    
    protected setupBehavior(): void {
        // Set up simple patrol route in a rectangular pattern
        const patrolDistance = 100;
        this.setPatrolPoints([
            new Phaser.Math.Vector2(this.x - patrolDistance, this.y - patrolDistance),
            new Phaser.Math.Vector2(this.x + patrolDistance, this.y - patrolDistance),
            new Phaser.Math.Vector2(this.x + patrolDistance, this.y + patrolDistance),
            new Phaser.Math.Vector2(this.x - patrolDistance, this.y + patrolDistance)
        ]);
    }
    
    protected updateBehavior(delta: number): void {
        this.stateTimer += delta;
        
        switch (this.currentState) {
            case MonsterState.PATROL:
                this.handlePatrolState();
                break;
                
            case MonsterState.IDLE:
                this.handleIdleState();
                break;
                
            case MonsterState.DEATH:
                // Death is handled in base class
                break;
        }
        
        // Update floating animation
        this.updateFloating(delta);
    }
    
    private handlePatrolState(): void {
        // Ghosts don't chase - they just patrol predictably
        this.moveAlongPatrol();
        
        // Occasionally pause for variety
        if (this.stateTimer > 3000 && Math.random() < 0.1) {
            this.setMonsterState(MonsterState.IDLE);
            
            // Stop movement
            const body = this.body as Phaser.Physics.Arcade.Body;
            body.setVelocity(0, 0);
        }
    }
    
    private handleIdleState(): void {
        // Stay idle for a short time, then return to patrol
        if (this.stateTimer > 1000) {
            this.setMonsterState(MonsterState.PATROL);
        }
    }
    
    private updateFloating(delta: number): void {
        // Create gentle floating motion
        this.floatingOffset += this.floatingSpeed * (delta / 1000);
        const floatY = Math.sin(this.floatingOffset) * 8; // 8 pixel floating range
        
        // Apply floating offset to position
        this.y = this.originalY + floatY;
    }
    
    protected updateAnimations(delta: number): void {
        this.animationTimer += delta;
        
        // Cycle through floating animation frames
        if (this.animationTimer >= 800) { // Slower animation for ghosts
            this.animationTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % 3; // 3 ghost floating frames
            this.setTexture(`ghost_float_${this.currentFrame}`);
        }
        
        // Handle flashlight exposure flashing (from base class)
        if (this.isExposedToFlashlight()) {
            // Base class handles the flashing white effect
        }
    }
    
    // Override collision to be less aggressive
    collideWithPlayer(): void {
        // Ghosts are the least threatening - they move slow and don't chase
        super.collideWithPlayer();
    }
}
