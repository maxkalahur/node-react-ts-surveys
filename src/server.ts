import app from "./app";
import { PORT } from "./constants/surveys.constants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));