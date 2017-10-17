export abstract class IDrawable {
    constructor(protected ctx: CanvasRenderingContext2D) { }
    abstract draw();
}
