import { useCallback, useEffect, useState } from 'react';

function useCookie(key: string, initialValue: string): [string, any, any] {
	// Cookie okuma islemi
	// Eger daha once ayni isimle tanimlanmis cookie varsa degeri donuluyor
	// Yoksa initialValue olarak gonderilen deger donduruluyor.
	const readCookie = useCallback((): string => {
		let name = key + '=';
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return initialValue;
	}, [key, initialValue]);

	// Cookie tutmak icin kullanilan state
	const [cookieState, setCookieState] = useState<string>(readCookie);

	// Cookie'yi kayit islemi
	const setCookie = useCallback(
		(value: string, maxAgeInDays: number): void => {
			// Yeni cookie browser'a kaydediliyor
			document.cookie = `${key}=${value}; max-age=${
				60 * 60 * 24 * maxAgeInDays
			}`;

			// Yeni deger state'e ekleniyor
			setCookieState(value);
		},
		[key]
	);

	// Cookie silme islemi
	const deleteCookie = (): void => {
		// Token cookie'si siliniyor
		document.cookie = `${key}=; max-age=-99999999;`;

		// Cookie state'i temizleniyor.
		setCookieState('');
	};

	useEffect(() => {
		setCookieState(readCookie());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [cookieState, setCookie, deleteCookie];
}

export default useCookie;
