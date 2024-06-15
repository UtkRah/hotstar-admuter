let maxVol = 1; // Default max volume
let isMutedByAdMuter = false;

function checkAd() {
  // Adjust selectors to better target ads during live matches
  const adContainer = document.querySelector('.ad-container, .ad-interrupting, .videoAdUi, .ad-showing'); // Added more selectors
  const videoPlayer = document.querySelector('video');

  if (videoPlayer) {
    let isAdPlaying = adContainer && (adContainer.style.display !== 'none' || adContainer.classList.contains('ad-interrupting') || adContainer.classList.contains('ad-showing'));

    if (isAdPlaying && !isMutedByAdMuter) {
      console.log('Ad detected, muting video.');
      videoPlayer.volume = 0;
      isMutedByAdMuter = true;
    } else if (!isAdPlaying && isMutedByAdMuter) {
      console.log('Ad ended, unmuting video.');
      videoPlayer.volume = maxVol;
      isMutedByAdMuter = false;
    } else if (!isAdPlaying && !isMutedByAdMuter) {
      console.log('No ad detected, video remains unmuted.');
    } else if (isAdPlaying && isMutedByAdMuter) {
      console.log('Ad still playing, video remains muted.');
    }
  } else {
    console.log('No video player found.');
  }
}

setInterval(checkAd, 1000);

document.addEventListener('DOMContentLoaded', () => {
  const videoPlayer = document.querySelector('video');
  if (videoPlayer) {
    maxVol = videoPlayer.volume;
    videoPlayer.addEventListener('play', checkAd);
    videoPlayer.addEventListener('ended', checkAd);
  }
});
