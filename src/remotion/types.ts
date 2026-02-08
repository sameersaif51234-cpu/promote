
export interface Template {
    template_name: string;
    duration_seconds: number;
    style: {
        font: string;
        primary_color: string;
        background: string;
        glow: boolean;
    };
    scenes: SceneConfig[];
}

export type SceneConfig =
    | TextEntranceConfig
    | ChartZoomConfig
    | CTAPunchConfig;

export interface TextEntranceConfig {
    type: 'text_entrance';
    text_source: 'ai_hype_text' | string;
    animation: {
        from: 'left' | 'right' | 'top' | 'bottom';
        scale: number[];
        opacity: number[];
        duration_frames: number;
        easing: 'easeOutBack' | 'easeInOut' | 'linear';
    };
}

export interface ChartZoomConfig {
    type: 'chart_zoom';
    source: 'chart_image';
    animation: {
        zoom: number[];
        pan: 'center' | 'top' | 'bottom';
        duration_frames: number;
    };
}

export interface CTAPunchConfig {
    type: 'cta_punch';
    text: string;
    animation: {
        scale: number[];
        shake: boolean;
        duration_frames: number;
    };
}
