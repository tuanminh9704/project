const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const systemConfig = require("./configs/system"); // Biến cấu hình để tạo biến locals
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const moment = require("moment");

// Cấu hình file env sử dụng thư viện dotenv
const dotenv = require("dotenv");
dotenv.config();

// Router
const clientRoute = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

// Cấu hình database
const database = require("./configs/database");
database.connect();

// Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));

// Thay đổi phương thức sử dụng thư viện method-override
app.use(methodOverride("_method"));

// Sử dụng thư viện body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// tinymce 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//
// End tinymce
// Flash
// app.use(express.cookieParser("HFEHFJFSHF"));
app.use(cookieParser("HFJNDJFKDKFK"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End flash

// Cấu hình pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Tạo biến dưới local có thể sử dụng được ở pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment

// Router
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
