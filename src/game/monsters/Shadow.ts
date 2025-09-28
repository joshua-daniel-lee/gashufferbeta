import { Scene } from 'phaser';
import { Monster, MonsterState } from '../Monster';
import { Player } from '../Player';

export class Shadow extends Monster {
    private guardPosition: Phaser.Math.Vector2;
    private alertLevel: number = 0; // 0 = calm, 1 = alert, 2 = high alert
    private alertTimer: number = 0;
    
    constructor(scene: Scene, x: number, y: number, player: Player) {
        super(scene, x, y, 'shadow_idle', player);
        
        this.guardPosition = new Phaser.Math.Vector2(x, y);
        
        // Shadow-specific properties
        this.speed = 0; // Shadows don't normally move - they guard
        this.detectionRange = 120; // Higher detection range
        this.flashlightDeathTime = 1000; // Instantly killed by flashlight (weak to light)
        
        // Set initial state
        this.setMonsterState(MonsterState.IDLE);
    }
    
    protected setupBehavior(): void {
        // Shadows don't patrol - they guard specific positions
        // They can be given guard items or doorways to protect
    }
    
    protected updateBehavior(delta: number): void {
        this.stateTimer += delta;
        this.alertTimer += delta;
        
        const distanceToPlayer = this.getDistanceToPlayer();
        const playerDetected = distanceToPlayer <= this.detectionRange;
        
        switch (this.currentState) {
            case MonsterState.IDLE:
                this.handleIdleState(playerDetected);
                break;
                
            case MonsterState.CHASE:
                this.handleChaseState(distanceToPlayer);
                break;
                
            case MonsterState.DEATH:
                // Death is handled in base class
                break;
        }
        
        // Update alert level based on player proximity
        this.updateAlertLevel(playerDetected, distanceToPlayer);
    }
    
    private handleIdleState(playerDetected: boolean): void {
        if (playerDetected) {
            // Shadow detects player - become alert and start chasing
            this.setMonsterState(MonsterState.CHASE);
            this.alertLevel = 2; // High alert
        }
        
        // Stay at guard position
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(0, 0);
    }
    
    private handleChaseState(distanceToPlayer: number): void {
        if (distanceToPlayer > this.detectionRange * 1.5) {
            // Lost player - return to guard position
            this.setMonsterState(MonsterState.IDLE);
            this.alertLevel = 0;
            return;
        }
        
        // Move towards player at moderate speed
        this.moveTowards(this.player.x, this.player.y, 100);
    }
    
    private updateAlertLevel(playerDetected: boolean, distanceToPlayer: number): void {
        if (playerDetected) {
            if (distanceToPlayer < 60) {
                this.alertLevel = 2; // High alert - very close
            } else if (distanceToPlayer < this.detectionRange) {
                this.alertLevel = 1; // Medium alert - detected but not close
            }
            this.alertTimer = 0; // Reset alert timer
        } else {
            // Gradually reduce alert level when player not detected
            if (this.alertTimer > 2000) { // After 2 seconds
                this.alertLevel = Math.max(0, this.alertLevel - 1);
                this.alertTimer = 0;
            }
        }
    }
    
    protected updateAnimations(delta: number): void {
        // Change texture based on alert level
        switch (this.alertLevel) {
            case 0:
                this.setTexture('shadow_idle');
                break;
            case 1:
            case 2:
                this.setTexture('shadow_alert');
                break;
        }
        
        // Handle flashlight exposure flashing (from base class)
        if (this.isExposedToFlashlight()) {
            // Base class handles the flashing white effect
            // Shadows are particularly vulnerable to flashlight
        }
    }
    
    // Override collision to be more aggressive when alert
    collideWithPlayer(): void {
        if (this.alertLevel >= 1) {
            // More damage when alert and aggressive
            super.collideWithPlayer();
        } else {
            // Less aggressive when just guarding
            super.collideWithPlayer();
        }
    }
    
    // Public method to set what the shadow is guarding
    setGuardTarget(x: number, y: number): void {
        this.guardPosition.set(x, y);
        this.setPosition(x, y);
    }
}
