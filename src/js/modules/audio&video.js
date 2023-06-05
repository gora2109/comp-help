let videoArray = [];
//todo: initVideo. функция инициализации видео файлов
//init video sttart
function initVideo() {
    let videoBlock = document.querySelectorAll('.video-block'),
        id;
    if (videoBlock.length){
        let players = Array.from(videoBlock).map(p => new Plyr(p,{
            youtube: {
                loop: 1,
                controls: 0,
            },
            volume: 1,
            // iconUrl: '../images/content/plyr-sprite.svg',//ссылка на самостоятельный спрайт иконок
            controls: [
                'play-large',
                'progress',
                'fullscreen',
            ],
        }));
        players.forEach(player => {
            player.on('play', ev =>{
                let playerId = ev.detail.plyr.id;
                players.forEach(pl =>{
                    if (playerId != pl.id){
                        pl.pause();
                    }
                });
            });
        });
    }

}
//init video end

//todo: функция иницииализации аудио файлов
//init Audio
function initAudioPlayer(){
    let players = Array.from(document.querySelectorAll('audio')).map(p => new Plyr(p, {
        controls: ['play', 'progress', 'current-time']
    }));
    if (document.querySelectorAll('.tracks').length){
        audioTrack(players);
    }
    players.forEach(player => {
        player.on('ready', event => {
            event.target.setAttribute('data-id' , player.id);
        });

        player.on('play', ev => {
            var Id = ev.target.dataset.id;
            players.forEach(pl => {
                if (Id != pl.id) {
                    pl.pause();
                }

            });
        });
        player.on('ended', ev => {
            let Id = ev.target.dataset.id;
            players.forEach(pl => {
                if (Id == pl.id) {
                    pl.stop();
                }
            });
        });
    });
}

function audioTrack(audioArray) {
    audioArray.forEach(player =>{
        player.on('play', ev => {
            var Id = ev.target.dataset.id;
            audioArray.forEach(pl => {
                if (ev.detail.plyr.media.classList.contains('track-player__audio')){
                    if (Id == pl.id) {
                        pl.media.closest('.track-item').classList.add('active');
                    }
                }

            });
        });
        player.on('pause', ev => {
            var Id = ev.target.dataset.id;
            audioArray.forEach(pl => {
                if (ev.detail.plyr.media.classList.contains('track-player__audio') && pl.media.closest('.track-item').classList.contains('active')){
                    if (Id == pl.id) {
                        pl.media.closest('.track-item').classList.remove('active');
                    }
                }
            });
        });
        player.on('ended', ev => {
            let itemActive = ev.target.dataset.id,
                trackListItems = ev.detail.plyr.media.closest('.track-item').nextElementSibling;
            if(trackListItems != null){
                audioArray.forEach(pl => {
                    if (ev.detail.plyr.media.classList.contains('track-player__audio')){
                        if (trackListItems.querySelector('.plyr').dataset.id == pl.id){
                            pl.play();
                        }
                    }
                });
            }
        });
    });
}
//init Audio

document.addEventListener("DOMContentLoaded", function () {
    initVideo();
    initAudioPlayer();
});