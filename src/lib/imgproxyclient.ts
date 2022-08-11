import { createHmac } from 'crypto';
import { Buffer } from 'buffer';
import { Converters } from './converters';
import { Adjust, Crop, Extend, GIFOptions, Gravity, Options, Padding, PNGOptions, Resize, RGBColor, Size, Trim, Watermark } from './types';

export class ImgProxyClient extends Converters {
  private options: any = {
    config: {},
    defaultOpts: {},
    settings: {},
  };

  private abbreviations = {
    resize: 'rs',
    size: 'size',
    resizing_type: 'rt',
    resizing_algorithm: 'ra',
    width: 'w',
    height: 'h',
    enlarge: 'el',
    extend: 'ex',
    gravity: 'g',
    crop: 'c',
    padding: 'pd',
    trim: 't',
    quality: 'q',
    max_bytes: 'mb',
    background: 'bg',
    adjust: 'a',
    brightness: 'br',
    contrast: 'co',
    saturation: 'sa',
    blur: 'bl',
    sharpen: 'sh',
    pixelate: 'pix',
    unsharpening: 'ush',
    watermark: 'wm',
    watermark_url: 'wmu',
    video_thumbnail_second: 'vts',
    style: 'st',
    jpeg_options: 'jpgo',
    png_options: 'pngo',
    gif_options: 'gifo',
    preset: 'pr',
    cachebuster: 'cb',
    strip_metadata: 'sm',
    strip_color_profile: 'scp',
    auto_rotate: 'ar',
    rotate: 'rot',
    filename: 'fn',
    format: 'ext',
  };

  private transformers = {
    resize: this.tresize,
    size: this.tsize,
    extend: this.textend,
    gravity: this.tgravity,
    crop: this.tcrop,
    padding: this.tpadding,
    background: this.tbackground,
    trim: this.ttrim,
    adjust: this.tadjust,
    watermark: this.twatermark,
    jpeg_options: this.tjpegOptions,
    png_options: this.tpngOptions,
    gif_options: this.tgifOptions,
  };

  constructor(
    { url, key, salt, autoreset }: { url: string; key?: string; salt?: string, autoreset?: boolean },
    options: Options = {},
  ) {
    super();

    this.options.config = { key, salt, url, autoreset: autoreset !== true ? !!autoreset : true };

    this.isObject(options);

    for (const key in options) {
      this.setOption(key, options[key]);
    }
  }

  setAutoreset(autoreset: boolean): any {
    this.options.config.autoreset = autoreset;
  }

  setOption(option: string, value: any): ImgProxyClient {
    if (value === null) {
      return this.resetOption(option);
    }

    this.options.settings[option] = `${this.abbreviations?.[option] ?? option}:${this.transformers?.[option]?.call?.(this, value) ?? value
      }`;

    return this;
  }

  private setOptions(options: Options): any {
    this.isObject(options);
    for (const key in options) {
      this.setOption(key, options[key]);
    }
  }

  setDefaultOptions(options: Options): any {
    this.isObject(options);
    this.options.defaultOpts = options;
    this.setOptions(options);

    return this;
  }

  resetDefaultOptions(): any {
    this.options.defaultOpts = {};
    return this;
  }

  resetOptions(): any {
    this.options.settings = {};
    this.setOptions(this.options.defaultOpts)
    return this;
  }

  resetOption(option: string): any {
    delete this.options.settings?.[this.abbreviations?.[option] ?? option];
    return this;
  }

  resize(val: Resize): any {
    return this.setOption('resize', val);
  }

  crop(val: Crop): any {
    return this.setOption('crop', val);
  }

  size(val: Size): any {
    return this.setOption('size', val);
  }

  extend(val: Extend): any {
    return this.setOption('extend', val);
  }

  trim(val: Trim): any {
    return this.setOption('trim', val);
  }

  adjust(val: Adjust): any {
    return this.setOption('adjust', val);
  }

  resizingType(val: 'fit' | 'fill' | 'auto'): any {
    return this.setOption('resizing_type', val);
  }

  resizingAlgorithm(val: 'nearest' | 'linear' | 'cubic' | 'lanczos2' | 'lanczos3'): any {
    return this.setOption('resizing_algorithm', val);
  }

  width(width: number): any {
    return this.setOption('width', `${width}`);
  }

  height(height: number): any {
    return this.setOption('height', `${height}`);
  }

  dpr(val: number | string): any {
    if (val > 0) {
      return this.setOption('dpr', `${val}`);
    }
    return this;
  }

  maxBytes(val: number): any {
    return this.setOption('max_bytes', `${val}`);
  }

  padding(val: Padding): any {
    return this.setOption('padding', val);
  }

  enlarge(val: number): any {
    return this.setOption('enlarge', `${val}`);
  }

  pixelate(val: number): any {
    return this.setOption('pixelate', `${val}`);
  }

  gravity(val: Gravity): any {
    return this.setOption('gravity', val);
  }

  quality(quality: number): any {
    return this.setOption('quality', `${quality}`);
  }

  background(color: RGBColor | string): any {
    return this.setOption('background', color);
  }

  backgroundAlpha(val: number): any {
    return this.setOption('background_alpha', `${val}`);
  }

  blur(val: number): any {
    return this.setOption('blur', `${val}`);
  }

  saturation(val: number): any {
    return this.setOption('saturation', `${val}`);
  }

  contrast(val: number): any {
    return this.setOption('contrast', `${val}`);
  }

  brightness(val: number): any {
    return this.setOption('brightness', `${val}`);
  }

  sharpen(val: number): any {
    return this.setOption('sharpen', `${val}`);
  }

  watermark(val: Watermark): any {
    return this.setOption('watermark', val);
  }

  watermarkUrl(val: string): any {
    return this.setOption('watermark_url', val);
  }

  preset(...presets: string[]): any {
    return this.setOption('preset', presets.join(':'));
  }

  cacheBuster(val: string): any {
    return this.setOption('cachebuster', val);
  }

  format(val: string): any {
    return this.setOption('format', val);
  }

  filename(val: string): any {
    return this.setOption('filename', val);
  }

  rotate(val: number): any {
    return this.setOption('rotate', val);
  }

  autoRotate(val: boolean): any {
    return this.setOption('auto_rotate', val);
  }

  style(val: string): any {
    return this.setOption('style', val);
  }

  page(val: number): any {
    return this.setOption('page', `${val}`);
  }

  videoThumbnailSecond(val: number): any {
    return this.setOption('video_thumbnail_second', `${val}`);
  }

  stripMetadata(val: boolean): any {
    return this.setOption('strip_metadata', val);
  }

  strip_color_profile(val: boolean): any {
    return this.setOption('strip_color_profile', val);
  }

  gifOptions(val: GIFOptions): any {
    return this.setOption('gif_options', val);
  }

  pngOptions(val: PNGOptions): any {
    return this.setOption('png_options', val);
  }

  private sign(target): any {
    const { config }: any = this.options;
    const hexKey = ImgProxyClient.hexDecode(config?.key);
    const hexSalt = ImgProxyClient.hexDecode(config?.salt);

    const hmac = createHmac('sha256', hexKey);
    hmac.update(hexSalt);
    hmac.update(target);
    return ImgProxyClient.urlSafeBase64(hmac.digest());
  }

  static hexDecode(hex): any {
    return Buffer.from(hex, 'hex');
  }

  static urlSafeBase64(string): any {
    return Buffer.from(string)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  public get(originalImage: string): any {
    const { settings, config }: any = this.options;

    if (!originalImage) {
      throw 'Missing required param: image';
    }

    const encoded_url = ImgProxyClient.urlSafeBase64(originalImage);
    const options = Object.values(settings).join('/');
    const path = options ? `/${options}/${encoded_url}` : `/${encoded_url}`;

    let url;
    if (config.key && config.salt) {
      url = `${config.url}/${this.sign(path)}${path}`;
    } else {
      url = `${config.url}/insecure${path}`;
    }

    if (this.options.config.autoreset) {
      this.resetOptions();
    }

    return url;
  }
}

export default ImgProxyClient;
