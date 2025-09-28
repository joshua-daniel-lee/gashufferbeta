import { Scene } from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasdKeys: { W: Phaser.Input.Keyboard.Key, A: Phaser.Input.Keyboard.Key, S: Phaser.Input.Keyboard.Key, D: Phaser.Input.Keyboard.Key };
    private flashlightKey: Phaser.Input.Keyboard.Key;
    
    // Player stats
    private health: number = 3;
    private maxHealth: number = 3;
    private flashlightBattery: number = 100;
    private maxBattery: number = 100;
    private isInvulnerable: boolean = false;
    
    // Movement properties
    private readonly MOVEMENT_SPEED = 160; // pixels/second as specified in game treatment
    private velocity: { x: number, y: number } = { x: 0, y: 0 };
    
    // Animation properties
    private walkAnimationTimer: number = 0;
    private currentWalkFrame: number = 0;
    private isUsingFlashlight: boolean = false;
    
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'gas_huffer_idle');
        
        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set up physics body
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setSize(24, 24, true); // Smaller collision box for better gameplay
        
        // Initialize input
        this.setupInput();
        
        // Set initial texture
        this.setScale(2); // 2x scale for visibility
        this.setTexture('gas_huffer_idle');
    }
    
    private setupInput(): void {
        // Arrow keys
        this.cursors = this.scene.input.keyboard!.createCursorKeys();
        
        // WASD keys
        this.wasdKeys = this.scene.input.keyboard!.addKeys('W,S,A,D') as any;
        
        // Flashlight key (spacebar)
        this.flashlightKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(time: number, delta: number): void {
        this.handleMovement(delta);
        this.handleFlashlight();
        this.updateAnimations(delta);
    }
    
    private handleMovement(delta: number): void {
        // Reset velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        
        // Check input for movement
        let isMoving = false;
        
        // Horizontal movement
        if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
            this.velocity.x = -this.MOVEMENT_SPEED;
            isMoving = true;
        } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
            this.velocity.x = this.MOVEMENT_SPEED;
            isMoving = true;
        }
        
        // Vertical movement
        if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
            this.velocity.y = -this.MOVEMENT_SPEED;
            isMoving = true;
        } else if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
            this.velocity.y = this.MOVEMENT_SPEED;
            isMoving = true;
        }
        
        // Normalize diagonal movement to maintain consistent speed
        if (this.velocity.x !== 0 && this.velocity.y !== 0) {
            const normalizedSpeed = this.MOVEMENT_SPEED / Math.sqrt(2);
            this.velocity.x = this.velocity.x > 0 ? normalizedSpeed : -normalizedSpeed;
            this.velocity.y = this.velocity.y > 0 ? normalizedSpeed : -normalizedSpeed;
        }
        
        // Apply velocity to physics body
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(this.velocity.x, this.velocity.y);
        
        // Update animation state
        this.updateMovementAnimation(isMoving);
    }
    
    private handleFlashlight(): void {
        if (Phaser.Input.Keyboard.JustDown(this.flashlightKey)) {
            if (this.flashlightBattery > 0) {
                this.isUsingFlashlight = !this.isUsingFlashlight;
                this.updateFlashlightSprite();
            }
        }
        
        // Drain battery when flashlight is active
        if (this.isUsingFlashlight && this.flashlightBattery > 0) {
            this.flashlightBattery = Math.max(0, this.flashlightBattery - 20); // 20% per second
            if (this.flashlightBattery <= 0) {
                this.isUsingFlashlight = false;
                this.updateFlashlightSprite();
            }
        }
    }
    
    private updateMovementAnimation(isMoving: boolean): void {
        if (isMoving) {
            // Update walk animation
            this.walkAnimationTimer += 16; // Assuming 60 FPS, delta is ~16ms
            if (this.walkAnimationTimer >= 200) { // Change frame every 200ms
                this.walkAnimationTimer = 0;
                this.currentWalkFrame = (this.currentWalkFrame + 1) % 4;
            }
            
            if (!this.isUsingFlashlight) {
                this.setTexture(`gas_huffer_walk_${this.currentWalkFrame}`);
            }
        } else {
            // Reset to idle
            this.walkAnimationTimer = 0;
            this.currentWalkFrame = 0;
            
            if (!this.isUsingFlashlight) {
                this.setTexture('gas_huffer_idle');
            }
        }
    }
    
    private updateFlashlightSprite(): void {
        if (this.isUsingFlashlight) {
            this.setTexture('gas_huffer_flashlight');
        } else {
            // Return to appropriate movement texture
            const body = this.body as Phaser.Physics.Arcade.Body;
            const isMoving = Math.abs(body.velocity.x) > 0 || Math.abs(body.velocity.y) > 0;
            
            if (isMoving) {
                this.setTexture(`gas_huffer_walk_${this.currentWalkFrame}`);
            } else {
                this.setTexture('gas_huffer_idle');
            }
        }
    }
    
    private updateAnimations(delta: number): void {
        // Handle invulnerability flashing
        if (this.isInvulnerable) {
            this.alpha = Math.sin(Date.now() * 0.01) * 0.3 + 0.7; // Flashing effect
        } else {
            this.alpha = 1;
        }
    }
    
    // Public methods for game systems
    takeDamage(amount: number = 1): boolean {
        if (this.isInvulnerable) return false;
        
        this.health = Math.max(0, this.health - amount);
        
        if (this.health > 0) {
            this.startInvulnerability();
        }
        
        return this.health <= 0; // Return true if player died
    }
    
    private startInvulnerability(): void {
        this.isInvulnerable = true;
        this.scene.time.delayedCall(1500, () => { // 1.5 seconds invulnerability
            this.isInvulnerable = false;
        });
    }
    
    heal(amount: number = 1): void {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
    
    rechargeBattery(amount: number = 25): void {
        this.flashlightBattery = Math.min(this.maxBattery, this.flashlightBattery + amount);
    }
    
    // Getters for UI
    getHealth(): number { return this.health; }
    getMaxHealth(): number { return this.maxHealth; }
    getBattery(): number { return this.flashlightBattery; }
    getMaxBattery(): number { return this.maxBattery; }
    isFlashlightActive(): boolean { return this.isUsingFlashlight; }
}
