import {songs} from './song-info.js'
import {artists} from './song-info.js'

console.log(songs, artists)

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


function slider() {
    const valPercent = mySlider.value / mySlider.max * 100
    mySlider.style.background = `linear-gradient(to right, #ff5500 ${valPercent}%, #cccccc ${valPercent}%)`
}

function notAvailableFeature() {
    alert('This feature is not availabled')
}

const songInHistory = $('#song-in-history')
const profileUserModal = $('.nav-bar .user-info-container')
const likedSong = $('#liked-song')
const famousArtist = $('#famous-artist')
const volumeSlider = $('#volume-slider')
const player = $('.playControls')
const mySlider = $('#my-slider')
const playlistModal = $('.playlist-modal')
const playlistBtn = $('.playlist')
const close = $('.close-icon')
const playlistContainer = $('.playlist-container')
const playBtn = $('.play-button')
const audio = $('audio')
const songImgOnControl = $('.control-song-info .song-img')
const songNameOnControl = $('.control-song-info .song-name')
const songAuthorOnControl = $('.control-song-info .song-author')
const prev = $('.prev-btn')
const next = $('.next-btn')
const shuffle = $('.shuffle-btn')
const repeat = $('.repeat-btn')
const minuteOfCurrentTime = $('.current-time .minute')
const secondOfCurrentTime = $('.current-time .second')
const minuteOfTotalTime = $('.total-time .minute')
const secondOfTotalTime = $('.total-time .second')
const menuModal = $('.nav-bar .menu-modal')
const mowylHideSong = $('.mowyl-hide-song')
const scwSongItemWrapper = $('.scw-song-item-wrapper')


const app = {
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    currentIndex: 0,

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return songs[this.currentIndex]
            }
        })
    },

    deleteClassActive: function() {
        document.querySelector(`[data-index="${app.currentIndex}"]`).classList.remove('active')
    },

    addClassActive: function() {
        document.querySelector(`[data-index="${app.currentIndex}"]`).classList.add('active')
    },

    loadCurrentSong: function () {
        songImgOnControl.style.backgroundImage = `url(${app.currentSong.songImg})`
        if (app.currentSong.songName.length > 32) {
            songNameOnControl.innerText = app.currentSong.songName.slice(0, 31) + '...'          
        } else {
            songNameOnControl.innerText = app.currentSong.songName
        }
        if (app.currentSong.songAuthor.length > 32) {
            songAuthorOnControl.innerText = app.currentSong.songAuthor.slice(0, 31) + '...'          
        } else {
            songAuthorOnControl.innerText = app.currentSong.songAuthor
        }
        audio.src = app.currentSong.path
        if (volumeSlider.value == 100) {
            volumeSlider.style.background = '#ff5500'
        }
        app.addClassActive()
    },

    handleEvent: function () {

        // USER MODAL

        profileUserModal.onclick = function () {
            document.querySelector('.nav-bar .user-info-container ul').classList.toggle('active') 
            profileUserModal.classList.toggle('active')
        }

        menuModal.onclick = function () {
            document.querySelector('.nav-bar .menu-modal ul').classList.toggle('active')
            menuModal.classList.toggle('active')
        }

        // OPEN/CLOSE PLAYLIST MODAL
        close.onclick = function () {
            playlistModal.classList.add('close')
            playlistBtn.classList.remove('active')
        }

        playlistBtn.onclick = function () {
            if (playlistModal.classList.contains('close')) {
                playlistModal.classList.remove('close')
                playlistBtn.classList.add('active')
                
            } else {
                playlistModal.classList.add('close')
                playlistBtn.classList.remove('active')

            }
        }

        // CLICK CONTROL BUTTON
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay = function () {
            app.isPlaying = true
            player.classList.add('playing')
        }

        audio.onpause = function () {
            app.isPlaying = false
            player.classList.remove('playing')
        }

        next.onclick = function () {
            app.deleteClassActive()
            if (app.isRandom) {
                let aRandomNumber = Math.floor(Math.random() * songs.length)
                while (aRandomNumber == app.currentIndex) {
                    aRandomNumber = Math.floor(Math.random() * songs.length)
                }
                app.currentIndex = aRandomNumber
            } else {
                app.currentIndex ++
                if (app.currentIndex >= songs.length) {
                    app.currentIndex = 0
                }
            }
            app.loadCurrentSong()
            app.renderHistory()
            audio.play()
        }

        prev.onclick = function () {
            app.deleteClassActive()
            if (app.isRandom) {
                let aRandomNumber = Math.floor(Math.random() * songs.length)
                while (aRandomNumber == app.currentIndex) {
                    aRandomNumber = Math.floor(Math.random() * songs.length)
                }
                app.currentIndex = aRandomNumber
            } else {
                app.currentIndex --
                if (app.currentIndex < 0) {
                    app.currentIndex = songs.length - 1
                }
            }
            app.loadCurrentSong()
            app.renderHistory()
            audio.play()
        }

        shuffle.onclick = function () {
            shuffle.classList.toggle('active')
            app.isRandom = !app.isRandom
        }

        repeat.onclick = function () {
            repeat.classList.toggle('active')
            app.isRepeat = !app.isRepeat
        }

        // AUIO TIME UPDATE
        audio.ontimeupdate = function () {
            if (audio.duration) {
                minuteOfTotalTime.innerText = Math.trunc(audio.duration / 60)
                minuteOfCurrentTime.innerText = Math.floor(audio.currentTime / 60)
                if (Math.floor(audio.duration % 60) < 10) {
                    secondOfTotalTime.innerText = '0' + `${Math.floor(audio.duration % 60)}`
                } else {
                    secondOfTotalTime.innerText = Math.floor(audio.duration % 60)
                }
                if (Math.floor(audio.currentTime % 60) < 10) {
                    secondOfCurrentTime.innerText = '0' + `${Math.floor(audio.currentTime % 60)}`
                } else {
                    secondOfCurrentTime.innerText = Math.floor(audio.currentTime % 60)
                }
                mySlider.value = (audio.currentTime) / (audio.duration) * 100
                slider()
            }
        }

        mySlider.oninput = function () {
            const valPercent = mySlider.value / mySlider.max * 100
            mySlider.style.background = `linear-gradient(to right, #ff5500 ${valPercent}%, #cccccc ${valPercent}%)`
            audio.currentTime = mySlider.value / 100 * audio.duration
        }

        audio.onended = function () {
            if (app.isRepeat) {
                setTimeout(function () {
                    audio.play()
                }, 5000)
            } else {
                setTimeout(function () {
                    next.click()
                }, 5000)
            }
        }

        // VOLUME 

        volumeSlider.oninput = function () {
            const valPercent = volumeSlider.value / volumeSlider.max * 100
            volumeSlider.style.background = `linear-gradient(to right, #ff5500 ${valPercent}%, #cccccc ${valPercent}%)`
            audio.volume = volumeSlider.value / 100
        }

        // CHOOSE SONG FROM PLAYLIST

        playlistContainer.onclick = function(e) {
            app.deleteClassActive()
            const choseIndex = Number(e.target.closest('.song-container').getAttribute('data-index'))
            app.currentIndex = choseIndex
            app.loadCurrentSong()
            app.renderHistory()
            audio.play()
        }

    },

    renderPlaylist: function() {
        const a = songs.map(function(song, index) {
            return `
                    <div class="song-container" data-index="${index}">
                        <div class="song-img"
                            style="background-image: url(${song.songImg});">
                        </div>
                        <div class="author-and-songname">
                            <div class="song-author">${song.songAuthor}</div>
                            <div class="song-name">${song.songName}</div>
                        </div>
                        <div class="song-time">4:25</div>
                    </div>
            `
        }).join('')
        playlistContainer.innerHTML = a
    },

    renderArtists: function () {
        const b = artists.map(function(artist) {
            return `
            <div class="artists-container">
            <div class="artist-avatar" style="background-image: url('${artist.artistAvatar}')"></div>
            <div class="artist-info">
                <div class="artist-name">${artist.artistName}</div>
                <div>
                    <div class="follower">
                        <i class="fa-solid fa-user-group"></i>        
                        <div class="number">${artist.artistStatus}</div>
                    </div>
                    <div class="track-number">
                        <i class="fa-regular fa-file-audio"></i>
                        <div class="number">${artist.artistTrack}</div>
                    </div>
                </div>
            </div>
            <div class="follow-btn">
                <i class="fa-solid fa-user-plus"></i>
                Follow
            </div>
        </div>
            `
        }).join('')
        famousArtist.innerHTML = b
    },

    renderLikedSong: function () {
        const a = []

        for (let i = 1; i <= 3; i++) {
                a.push(`
                <div class="favorite-song-container">
                <div class="song-avatar" style="background-image: url('${songs[songs.length - i].songImg}')">
                                    <div class="favorite-play-button">
                    <i class="fa-solid fa-play"></i>
                </div></div>
                <div class="song-info">
                <div class="other-button">
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                <div class="favorite-song-author">${songs[songs.length - i].songAuthor}</div>
                <div class="favorite-song-name">${songs[songs.length - i].songName}</div>
                <div class="favorite-song-detail">
                <div class="detail">
                <i class="fa-solid fa-play"></i>
                ${Math.floor(Math.random()*1000)}
                </div>
                <div class="detail">
                <i class="fa-solid fa-heart"></i>
                ${Math.floor(Math.random()*1000)}
                </div>
                <div class="detail">
                <i class="fa-solid fa-repeat"></i>
                ${Math.floor(Math.random()*1000)}
                </div>
                <div class="detail">
                <i class="fa-solid fa-comment"></i>
                ${Math.floor(Math.random()*1000)}
                </div>
                </div>
                </div>
                </div>
                `)
            }
        likedSong.innerHTML = a.join('')
    },

    renderMowyl: function () {
        const a = []
        let b = songs.map(function (song) {
            return `
            <div class="mowyl-song-item">
            <div class="mowyl-song-img" style="background-image: url('${song.songImg}');">
            <div class="mowyl-half-below">
            <div class="mowyl-other-button">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        </div>
        <div class="mowyl-play-button">
            <i class="fa-solid fa-play"></i>
        </div>
            </div>
            <div class="mowyl-song-name">${song.songName}</div>
            <div class="mowyl-song-author">${song.songAuthor}</div>
            </div>
            `
        }).join('')
        mowylHideSong.innerHTML = b
    },

    renderScw: function () {
        let a = songs.map(function (song) {
            return `
            <div class="scw-song-item">
                <div class="scw-other-button">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-repeat"></i>
                <i class="fa-solid fa-share-from-square"></i>
                <i class="fa-solid fa-link"></i>
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div class="scw-song-name"><span>${song.songAuthor} - </span>${song.songName}</div>
            <div class="scw-playrate">
                <i class="fa-solid fa-play"></i>
                ${Math.floor((Math.random()+1)*100)}K
            </div>
            </div>
            `
        }).join('')
        scwSongItemWrapper.innerHTML = a
    },

    renderHistory: function () {
        if (listenHistory.includes(app.currentSong)) {
            let a = listenHistory.lastIndexOf(app.currentSong)
            listenHistory.splice(a, 1)
            listenHistory.unshift(songs[app.currentIndex])
        } else {
            listenHistory.pop()
            listenHistory.unshift(songs[app.currentIndex])
        }

        const a = []

        for (let i = 0; i <= 2; i++) {
            a.push(`
            <div class="favorite-song-container">
                <div class="song-avatar" style="background-image: url('${listenHistory[i].songImg}')">
                    <div class="favorite-play-button">
                    <i class="fa-solid fa-play"></i>
                </div>
                </div>
                <div class="song-info">
                    <div class="other-button">
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                    <div class="favorite-song-author">${listenHistory[i].songAuthor}</div>
                    <div class="favorite-song-name">${listenHistory[i].songName}</div>
                    <div class="favorite-song-detail">
                        <div class="detail">
                            <i class="fa-solid fa-play"></i>
                            ${Math.floor(Math.random()*1000)}
                        </div>
                        <div class="detail">
                            <i class="fa-solid fa-heart"></i>
                            ${Math.floor(Math.random()*1000)}
                        </div>
                        <div class="detail">
                            <i class="fa-solid fa-repeat"></i>
                            ${Math.floor(Math.random()*1000)}
                        </div>
                        <div class="detail">
                            <i class="fa-solid fa-comment"></i>
                            ${Math.floor(Math.random()*1000)}
                        </div>
                        </div>
                    </div>
            </div>
            `)
        }
        songInHistory.innerHTML = a.join('')
    },
    

    start: function () {
        app.renderHistory()
        app.renderMowyl()
        app.renderScw()
        app.handleEvent()
        app.renderPlaylist()
        app.renderLikedSong()
        app.renderArtists()
        app.defineProperties()
        app.loadCurrentSong()
    }
}

var listenHistory = [
    songs[12],
    songs[13],
    songs[14],
]

app.start()








