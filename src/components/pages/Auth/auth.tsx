import React, { useState } from 'react';
import styles from './auth.module.css';
import logo from './assets/logo.png';
import logoButton from './assets/logoButton.png';
import pers from './assets/stalker.png';

const DEMO_BASE_URL = "/api";

// Demo tokens (demo API — no OAuth)
// Keep these as-is for demo usage. Replace with secure retrieval if needed.
const DEMO_APP_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwibmJmIjoxNjczNzk3ODM4LCJleHAiOjQ4MjczOTc4MzgsImlhdCI6MTY3Mzc5NzgzOCwianRpIjoiYXhwbzAzenJwZWxkMHY5dDgzdzc1N2x6ajl1MmdyeHVodXVlb2xsZ3M2dml1YjVva3NwZTJ3eGFrdjJ1eWZxaDU5ZDE2ZTNlN2FqdW16Z3gifQ.ZNSsvwAX72xT5BzLqqYABuH2FGbOlfiXMK5aYO1H5llG51ZjcPvOYBDRR4HUoPZVLFY8jyFUsEXNM7SYz8qL9ePmLjJl6pib8FEtqVPmf9ldXvKkbaaaSp4KkJzsIEMY_Z5PejB2Vr-q-cL13KPgnLGUaSW-2X_sHPN7VZJNMjRgjw4mPiRZTe4CEpQq0BEcPrG6OLtU5qlZ6mLDJBjN2xtK0DI6xgmYriw_5qW1mj1nqF_ewtUiQ1KTVhDgXnaNUdkGsggAGqyicTei0td6DTKtnl3noD5VkipWn_CwSqb2Mhm16I9BPfX_d5ARzWrnrwPRUf6PA_7LipNU6KkkW0mhZfmwEPTm_sXPus0mHPENoVZArdFT3L5sOYBcpqwvVIEtxRUTdcsKp-y-gSzao5muoyPVoCc2LEeHEWx0cIi9spsZ46SPRQpN4baVFp7y5rp5pjRsBKHQYUJ0lTmh1_vyfzOzbtNN2v6W_5w9JTLrN1U6fhmifvKHppFSEqD6DameL1TC59kpIdufRkEU9HE4O-ErEf1GuJFRx-Dew6XDvb_ExhvEqcw31yNvKzpVqLYJfLazqn6tUbVuAiPwpy6rP9tYO2taT1vj5TGn_vxwDu9zoLWe796tFMPS-kmbCglxB5C9L4EbpfWNbWxYjUkTvjT2Ml9OnrB0UbYo1jI";
const DEMO_USER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwic3ViIjoiMSIsIm5iZiI6MTY3Mzc5NzgzOCwiZXhwIjo0ODI3Mzk3ODM4LCJpYXQiOjE2NzM3OTc4MzgsImp0aSI6IjJlamRwOG54a3A1djRnZWdhbWVyeWlkMW5ic24zZDhpZ2oyejgzem1vMDYzNjNoaXFkNWhwOTY1MHZwdWh4OXEybXBmd2hnbnUxNHR5cmp2In0.Ocw4CzkkuenkAOjkAR1RuFgLqix7VJ-8vWVS3KAJ1T3SgIWJG145xqG2qms99knu5azn_oaoeyMOXhyG_fuMQFGOju317GiS6pAXAFGOKvxcUCfdpFcEHO6TWGM8191-tlfV-0rAqCi62gprKyr-SrUG3nUJhv6XKegja_vYVujRVx0ouAaDvDKawiOssG5If_hXGhdhnmb3_7onnIc4hFsm4i9QVkWXe8GO6OsS999ZIX0ClNhTk2kKKTl2dDVIiKha_HB1aghm_LOYoRgb3i3B_DH4UO312rHYR5I4qO43c8x-TW7NwovItDSzhiCmcxZuUUeAUF3yFr5ovaR4fMj1LEy3y3V2piQDKPwmBOpI9S6OzWUIBJYcRYlT2HIrWCRc0YvM7AOGoxcH2Gf4ncqcF_M8fw7IMKf3pdnuxf1EbdEpzOapBD1Pw065em-U8PN4LVzw9lhIHx_Yj69qaFEx7Bhw3BCwsrx-o9hgg7T1TOV6kF11YfR99lIuj9z96XBLg5ipt-M_j7nHRoHWhM0Rc6uLIKPg0In0xYkybSfWG6v3Hs6kwgB7wkqpXpoVQltJvlqjtlf9Pp4zmkqlWQHx9as4xsgoTAQyCgaC0kisICNC58_g3QrJAfoFXW68x-OHlRKCAPqoR9V-0cVs-B83szaFmsEGegAttFLlDhE";

interface TokenResponse {
    accessToken: string;
};

// Simple demo token accessor
export const getDemoToken = async (type: "app" | "user"): Promise<string> => {
    return type === "app" ? DEMO_APP_TOKEN : DEMO_USER_TOKEN;
};

export const Auth = () => {
    const [region, setRegion] = useState<string>("RU");
    const [tokenType, setTokenType] = useState<"app" | "user">("app");
    const [lastResponse, setLastResponse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const testAuth = async (r: string = region) => {
        setLoading(true);
        try {
            const token = await getDemoToken(tokenType);
            const response = await fetch(`${DEMO_BASE_URL}/${r}/characters`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });

            const data = await response.json();
            setLastResponse({ status: response.status, data });
            console.log('Demo API response:', data);
            return data;
        } catch (err) {
            setLastResponse({ error: String(err) });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const copyToken = async () => {
        const token = await getDemoToken(tokenType);
        try {
            await navigator.clipboard.writeText(token);
        } catch {
            // ignore
        }
    };

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.rowContainer}>
                <div className={styles.authWindow}>
                    <h1>Добро пожаловать на Stalcraft <span>Market</span></h1>
                    <img className={styles.logo} src={logo} alt="Logotype project 'StalCraft Market'" />
                    <p className={styles.description}>Вы используете demo API (dapi). Авторизация в демо режиме осуществляется через предзаполненные токены.</p>

                    <div style={{ marginBottom: 12 }}>
                        <label style={{ marginRight: 8 }}>
                            Region:
                            <select value={region} onChange={e => setRegion(e.target.value)} style={{ marginLeft: 8 }}>
                                <option value="RU">RU</option>
                                <option value="EU">EU</option>
                                <option value="US">US</option>
                            </select>
                        </label>

                        <label style={{ marginLeft: 16 }}>
                            Token:
                            <select value={tokenType} onChange={e => setTokenType(e.target.value as "app" | "user")} style={{ marginLeft: 8 }}>
                                <option value="app">App (public)</option>
                                <option value="user">User (demo)</option>
                            </select>
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => testAuth()} className={styles.buttonLogin} disabled={loading}>
                            <span><img src={logoButton} alt="" /></span>
                            <p>{loading ? 'Запрос...' : 'Тестировать запрос'}</p>
                        </button>

                        <button onClick={copyToken} className={styles.buttonLogin}>
                            <p>Скопировать токен</p>
                        </button>
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <strong>Последний ответ:</strong>
                        <pre style={{ maxHeight: 200, overflow: 'auto', background: '#111', color: '#eee', padding: 8 }}>
                            {lastResponse ? JSON.stringify(lastResponse, null, 2) : 'Нет данных'}
                        </pre>
                    </div>

                    <p className={styles.exboAuth}>DEMO: запросы идут через dapi.stalcraft.net. Для реальной авторизации используйте EXBO eapi и OAuth2 PKCE (separate flow).</p>
                </div>

                <img className={styles.stalkerSetting} src={pers} alt="Персонаж взятый из игры" />
            </div>
        </div>
    );
};