export type Music = {
	title: string;
	artist: string;
	artwork: string;
	url: string;
};

export const songs: Music[] = [
	{
		title: 'Tchaikovsky: The Nutcracker, Op. 71, Act 2: No. 14a, Pas de deux. Andante maestoso',
		artist: 'Pyotr Ilyich Tchaikovsky, Sir Simon Rattle, Berliner Philharmoniker',
		artwork: 'albums/nutcracker.jpg',
		url: 'albums/nutcracker.mp3'
	}
];
export const currentMusic = $state<Music | null>(null);
