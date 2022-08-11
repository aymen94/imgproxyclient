import { Resize, RGBColor, Size } from "./types";

export class Converters {
    protected isObject(val: any) : void{
        if (!val || typeof val !== 'object') {
            throw 'Error: Object param required';
        }
    }

    private stringify(option: any[]): string {
        return option.map((o) => o ?? '').join(':');
    }

    protected tresize(val: Resize): string {
        this.isObject(val);
        const {
            resizing_type, width, height, enlarge, extend,
        } = val;
        return this.stringify([resizing_type, width, height, enlarge, extend]);
    }

    protected tsize(val: Size): string {
        this.isObject(val);
        const {
            width, height, enlarge, extend,
        } = val;
        return this.stringify([width, height, enlarge, extend]);
    }

    protected textend(val: any): string {
        this.isObject(val);
        const { extend, gravity } = val;
        return this.stringify([extend, gravity]);
    }

    protected tgravity(val: any): string {
        this.isObject(val);
        const { gravity_type, x_offset, y_offset } = val;
        return this.stringify([gravity_type, x_offset, y_offset]);
    }

    protected tcrop(val: any): string {
        this.isObject(val);
        const { width, height, gravity } = val;
        return this.stringify([width, height, gravity]);
    }

    protected tbackground(val: RGBColor | string): string {
        if (typeof val === 'object' && 'r' in val && 'g' in val && 'b' in val) {
            return `${val.r}:${val.g}:${val.b}`
        }
        return val?.replace?.('#', '');
    }

    protected tpadding(val: any): string {
        this.isObject(val);
        const {
            top, right, buttom, left,
        } = val;
        return this.stringify([top, right, buttom, left]);
    }

    protected ttrim(val: any): string {
        this.isObject(val);
        const {
            threshold, color, equal_hor, equal_ver,
        } = val;
        return this.stringify([threshold, color, equal_hor, equal_ver]);
    }

    protected tadjust(val: any): string {
        this.isObject(val);
        const { brightness, contrast, saturation } = val;
        return this.stringify([brightness, contrast, saturation]);
    }

    protected twatermark(val: any): string {
        this.isObject(val);
        const {
            opacity, position, x_offset, y_offset, scale,
        } = val;
        return this.stringify([opacity, position, x_offset, y_offset, scale]);
    }

    protected tjpegOptions(val: any): string {
        this.isObject(val);
        const {
            progressive,
            no_subsample,
            trellis_quant,
            overshoot_deringing,
            optimize_scans,
            quant_table,
        } = val;
        return this.stringify([
            progressive,
            no_subsample,
            trellis_quant,
            overshoot_deringing,
            optimize_scans,
            quant_table,
        ]);
    }

    protected tpngOptions(val: any): string {
        this.isObject(val);
        const { png_interlaced, png_quantize, png_quantization_colors } = val;
        return this.stringify([
            png_interlaced,
            png_quantize,
            png_quantization_colors,
        ]);
    }

    protected tgifOptions(val: any): string {
        this.isObject(val);
        const { gif_optimize_frames, gif_optimize_transparency } = val;
        return this.stringify([gif_optimize_frames, gif_optimize_transparency]);
    }
}