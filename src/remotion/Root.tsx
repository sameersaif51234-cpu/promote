import { Composition } from 'remotion';
import { MainComposition } from './Composition';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="PromoVideo"
                component={MainComposition}
                durationInFrames={30 * 30} // 30 seconds
                fps={30}
                width={1080}
                height={1920}
                defaultProps={{
                    coinName: 'CoinName',
                    symbol: 'CN',
                    logoUrl: '',
                    chartUrl: '',
                    ctaText: 'BUY NOW',
                    script: ['HYPE', 'MOON', 'LAMBO'],
                    style: 'pump'
                }}
            />
        </>
    );
};
