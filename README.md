## Javascript client for [imgproxy](https://imgproxy.net/).

    //create config Instance
    import ImgProxyClient from 'ImgProxyClient';
    const { ImgProxyClient } = ImgProxyClient;
    export const imageprxyIstance = new ImgProxyClient({url: 'https://imgproxy.test.com'}, {size:{width:40, height: 40, enlarge:true, extend:false}, background: '#ffffff'});

    import in your class/function config
    import {imageprxyIstance} from 'src/config/configImgProxy.js';

    const finalImg = instance.get("http://images.com/logo.png");
