## Javascript client for [imgproxy](https://imgproxy.net/).

    //create config Instance
    import { ImgProxyClient } from 'imgproxyclientjs';
    export const imageprxyIstance = new ImgProxyClient({url: 'https://imgproxy.test.com'}, {size:{width:40, height: 40, enlarge:true, extend:false}, background: '#ffffff'});
    const finalImg = imageprxyIstance.get("http://images.com/logo.png");
