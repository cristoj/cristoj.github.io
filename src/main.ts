import ErrorRenderer from "@/_shared/infraestructura/RenderError";
import {initializeApp} from "@/bootstrap";

initializeApp().catch((error: unknown) => {
    const errorRender = new ErrorRenderer();
    errorRender.render(error);
});
