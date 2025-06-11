export type Music = {
	title: string;
	artist: string;
	artwork: string;
	url: string;
};

export const SONGS: Music[] = [
	{
		title: 'Tchaikovsky: The Nutcracker, Op. 71, Act 2: No. 14a, Pas de deux. Andante maestoso',
		artist: 'Pyotr Ilyich Tchaikovsky, Sir Simon Rattle, Berliner Philharmoniker',
		artwork: 'albums/nutcracker.jpeg',
		url: 'albums/nutcracker.mp3'
	},
	{
		title: 'Paquita: Variation 4: Allegro',
		artist:
			'Ludwig Minkus, Anna Takova-Baynova, Valentina Raicheva, Sofia National Opera Orchestra, Boris',
		artwork: 'albums/paquita.jpeg',
		url: 'albums/paquita.mp3'
	},
	{
		title: 'Act I: Variation Of Kitri (Minkus)',
		artist: 'Mariinsky Orchestra',
		artwork: 'albums/minkus.jpeg',
		url: 'albums/minkus.mp3'
	}
];

export const globals = $state({
	assetsLoaded: false,
	songIndex: 0,
	isMuted: true
});

const audioInstances = new Set<HTMLAudioElement>();
let currentAudio: HTMLAudioElement | null = null;

export function playSong(i: number) {
	if (currentAudio) {
		currentAudio.pause();
		unregisterAudio(currentAudio);
		currentAudio = null;
	}

	const song = SONGS[i];
	if (song) {
		currentAudio = new Audio(song.url);
		currentAudio.volume = 0.3;
		currentAudio.loop = true;
		registerAudio(currentAudio);
		currentAudio.play();
	}
}

export function changeSong() {
	globals.songIndex = (globals.songIndex + 1) % SONGS.length;
	globals.isMuted = false;
	playSong(globals.songIndex);
}

export function registerAudio(audio: HTMLAudioElement) {
	audioInstances.add(audio);
	audio.muted = globals.isMuted;
	audio.addEventListener('ended', () => {
		audioInstances.delete(audio);
	});
}

export function unregisterAudio(audio: HTMLAudioElement) {
	audioInstances.delete(audio);
}

export function toggleMute() {
	globals.isMuted = !globals.isMuted;

	const domAudioElements = Array.from(document.querySelectorAll('audio'));
	const domVideoElements = Array.from(document.querySelectorAll('video'));

	[...domAudioElements, ...domVideoElements, ...audioInstances].forEach((element) => {
		element.muted = globals.isMuted;
	});
}

playSong(globals.songIndex);
