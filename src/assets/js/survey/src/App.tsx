import { useState, useEffect } from 'react';
import { AppContext, AppCtx } from './interfaces';
import axios from 'axios';
import PreviewAlert from './components/PreviewAlert';
import ProgressBar from './components/ProgressBar';
import Questions from './components/Questions';
import Spinner from './components/Spinner';

export default function App() {

    const [appContext, setAppContext] = useState<AppContext | null>(null);
    // const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        
        try {
            const [ surveyType, surveyKey ]: string[] = window.location.pathname.split('/').filter(Boolean);
            const isPreview = new URLSearchParams(window.location.search).has('preview');

            axios.get<AppContext>('/get-survey-data.json', { params: { surveyType: surveyType, surveyKey: surveyKey, preview: isPreview } })
                .then(res => {
                    setAppContext({...res.data, questionsList: []});
                    setIsLoaded(true);
                })
                .catch(e => {
                    setIsLoaded(true);
                    console.log(e.message)
                });

        }
        catch(e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
            setIsLoaded(true);
        }

    }, []);

    

    return (
        <div className="App survey-page">
        
            <div className="container-fluid">

                {!isLoaded &&
                    <Spinner />
                }

                {isLoaded &&
                    <AppCtx.Provider value={appContext}>
                        {appContext?.isPreview && <PreviewAlert /> }
                        <ProgressBar />
                        <Questions />
                    </AppCtx.Provider>
                }
                
            </div>
        </div>
    );
}
