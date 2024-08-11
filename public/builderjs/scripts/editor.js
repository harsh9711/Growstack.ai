var params = new URLSearchParams(window.location.search);
var strict = params.get("type") == "custom" ? false : true;
var templates = [
  { name: "Blank", url: "/app/create/email-builder/design?id=6037a0a8583a7&type=default", thumbnail: "builderjs/templates/default/6037a0a8583a7/thumb.png" },
  { name: "Pricing Table", url: "/app/create/email-builder/design?id=6037a2135b974&type=default", thumbnail: "builderjs/templates/default/6037a2135b974/thumb.png" },
  { name: "Listing & Tables", url: "/app/create/email-builder/design?id=6037a2250a3a3&type=default", thumbnail: "builderjs/templates/default/6037a2250a3a3/thumb.png" },
  { name: "Forms Building", url: "/app/create/email-builder/design?id=6037a23568208&type=default", thumbnail: "builderjs/templates/default/6037a23568208/thumb.png" },
  { name: "1-2-1 column layout", url: "/app/create/email-builder/design?id=6037a2401b055&type=default", thumbnail: "builderjs/templates/default/6037a2401b055/thumb.png" },
  { name: "1-2 column layout", url: "/app/create/email-builder/design?id=6037a24ebdbd6&type=default", thumbnail: "builderjs/templates/default/6037a24ebdbd6/thumb.png" },
  { name: "1-3-1 column layout", url: "/app/create/email-builder/design?id=6037a25ddce80&type=default", thumbnail: "builderjs/templates/default/6037a25ddce80/thumb.png" },
  { name: "1-3-2 column layout", url: "/app/create/email-builder/design?id=6037a26b0a286&type=default", thumbnail: "builderjs/templates/default/6037a26b0a286/thumb.png" },
  { name: "1-3 column layout", url: "/app/create/email-builder/design?id=6037a275bf375&type=default", thumbnail: "builderjs/templates/default/6037a275bf375/thumb.png" },
  { name: "One column layout", url: "/app/create/email-builder/design?id=6037a28418c95&type=default", thumbnail: "builderjs/templates/default/6037a28418c95/thumb.png" },
  { name: "2-1-2 column layout", url: "/app/create/email-builder/design?id=6037a29a35e05&type=default", thumbnail: "builderjs/templates/default/6037a29a35e05/thumb.png" },
  { name: "2-1 column layout", url: "/app/create/email-builder/design?id=6037a2aa315d4&type=default", thumbnail: "builderjs/templates/default/6037a2aa315d4/thumb.png" },
  { name: "Two columns layout", url: "/app/create/email-builder/design?id=6037a2b67ed27&type=default", thumbnail: "builderjs/templates/default/6037a2b67ed27/thumb.png" },
  { name: "3-1-3 column layout", url: "/app/create/email-builder/design?id=6037a2c3d7fa1&type=default", thumbnail: "builderjs/templates/default/6037a2c3d7fa1/thumb.png" },
  { name: "Three columns layout", url: "/app/create/email-builder/design?id=6037a2dcb6c56&type=default", thumbnail: "builderjs/templates/default/6037a2dcb6c56/thumb.png" },
];
var tags = [
  { type: "label", tag: "CONTACT_FIRST_NAME" },
  { type: "label", tag: "CONTACT_LAST_NAME" },
  { type: "label", tag: "CONTACT_FULL_NAME" },
  { type: "label", tag: "CONTACT_EMAIL" },
  { type: "label", tag: "CONTACT_PHONE" },
  { type: "label", tag: "CONTACT_ADDRESS" },
  { type: "label", tag: "ORDER_ID" },
  { type: "label", tag: "ORDER_DUE" },
  { type: "label", tag: "ORDER_TAX" },
  { type: "label", tag: "PRODUCT_NAME" },
  { type: "label", tag: "PRODUCT_PRICE" },
  { type: "label", tag: "PRODUCT_QTY" },
  { type: "label", tag: "PRODUCT_SKU" },
  { type: "label", tag: "AGENT_NAME" },
  { type: "label", tag: "AGENT_SIGNATURE" },
  { type: "label", tag: "AGENT_MOBILE_PHONE" },
  { type: "label", tag: "AGENT_ADDRESS" },
  { type: "label", tag: "AGENT_WEBSITE" },
  { type: "label", tag: "AGENT_DISCLAIMER" },
  { type: "label", tag: "CURRENT_DATE" },
  { type: "label", tag: "CURRENT_MONTH" },
  { type: "label", tag: "CURRENT_YEAR" },
  { type: "button", tag: "PERFORM_CHECKOUT", text: "Checkout" },
  { type: "button", tag: "PERFORM_OPTIN", text: "Subscribe" },
];

// Helper function to join paths
function joinPaths() {
  var paths = [];
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (arg && arg !== "") {
      paths.push(arg);
    }
  }
  return paths.join("/").replace(/\/+/g, "/");
}

// Construct template and theme URLs
var type = params.get("type"); // Assuming params is defined earlier
var id = params.get("id"); // Assuming params is defined earlier
var templateUrl = joinPaths("templates", type, id, "index.html");
var themeUrl = joinPaths("templates", type, id, "theme.js");

// Construct dist URL dynamically
var baseUrl = window.location.origin + window.location.pathname;
baseUrl = baseUrl.replace(/\/[^\/]+$/, "");
var distUrl = joinPaths(baseUrl, "dist");

// Initialize Editor with dynamic URLs
var editor = new Editor({
  strict: strict,
  showInlineToolbar: true,
  root: "/builderjs/dist",
  url: "/builderjs/" + templateUrl,
  urlBack: "/app/create/email-builder",
  uploadAssetUrl: "/api/email-builder/upload-asset",
  uploadAssetMethod: "POST",
  uploadTemplateUrl: "/api/email-builder/upload-template",
  uploadTemplateCallback: function (response) {
    window.location = response.url;
  },
  saveUrl: "/api/email-builder/save",
  saveMethod: "POST",
  data: {
    _token: "CSRF_TOKEN", // Replace with your CSRF token if applicable
    type: type,
    template_id: id,
  },
  templates: templates,
  tags: tags,
  changeTemplateCallback: function (url) {
    window.location = url;
  },
  export: {
    url: "/api/email-builder/export", // Replace with your export URL if needed e.g 'export.php'
  },
  backgrounds: [
    "/builderjs/assets/image/backgrounds/images1.jpg",
    "/builderjs/assets/image/backgrounds/images2.jpg",
    "/builderjs/assets/image/backgrounds/images3.jpg",
    "/builderjs/assets/image/backgrounds/images4.png",
    "/builderjs/assets/image/backgrounds/images5.jpg",
    "/builderjs/assets/image/backgrounds/images6.jpg",
    "/builderjs/assets/image/backgrounds/images9.jpg",
    "/builderjs/assets/image/backgrounds/images11.jpg",
    "/builderjs/assets/image/backgrounds/images12.jpg",
    "/builderjs/assets/image/backgrounds/images13.jpg",
    "/builderjs/assets/image/backgrounds/images14.jpg",
    "/builderjs/assets/image/backgrounds/images15.jpg",
    "/builderjs/assets/image/backgrounds/images16.jpg",
    "/builderjs/assets/image/backgrounds/images17.png",
  ],
});

// Continue with the rest of your JavaScript code...

// @RSS plugin
var rssWidget = new RssWidget({ handler: "rss.php" });
editor.addWidget(rssWidget, { index: 10 });

$(document).ready(function () {
  editor.init();
});
