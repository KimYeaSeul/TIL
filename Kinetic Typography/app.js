import {Visual} from './visual.js';
// import {Text} from './text.js';

class App {
    constructor() {
        this.setWebgl();

        WebFont.load({
            google: {
              families: ['Hind:700']
            },
            // https://withthisclue.tistory.com/entry/Javascript-%ED%8E%98%EC%9D%B4%EC%A7%80-width-%EA%B5%AC%ED%95%98%EA%B8%B0-documentwidth-elementclientWidth-windowscreenwidth-%EC%B0%A8%EC%9D%B4
            fontactive: () => {

                // this.text = new Text();
                // this.text.setText('B', 2, document.body.clientWidth, document.body.clientHeight);
                
                this.visual = new Visual();

                window.addEventListener('resize', this.resize.bind(this), false);
                this.resize();

                requestAnimationFrame(this.animate.bind(this));
            }
        });
    }
    setWebgl(){
        this.renderer = new PIXI.Renderer({
            width : document.body.clientWidth,
            height : document.body.clientHeight,
            antialias : true,
            transparent : false,
            resolution : (window.devicePixelRatio > 1) ? 2 :1,
            autoDensity: true,
            powerPreference : "high-performance",
            backgroundColor : 0xffffff,
        });
        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.renderer.resize(this.stageWidth, this.stageHeight);

        this.visual.show(this.stageWidth, this.stageHeight, this.stage);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        this.visual.animate();
        this.renderer.render(this.stage);
    }
}

window.onload = () => {
    new App();
};