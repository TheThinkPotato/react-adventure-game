export const playerAsset = () => {

    const playerScale = 16;

    const playerImg = new Image();
    playerImg.src = "/assets/player.png";
    
    return {
        playerScale,
        playerImg,        
    }
}