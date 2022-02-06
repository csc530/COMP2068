(function(window, undefined) {
  var dictionary = {
    "b392d5b9-3c80-469b-8a23-73114dd6c185": "home",
    "970bd2e1-335c-40d4-8ae0-4ac877f930db": "projects",
    "97ddeb3d-5115-441d-a27f-ee077a7a6666": "contact",
    "b8d039b9-6383-4c4e-b4a3-48bef217903d": "about",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "24004a00-12ea-4d48-b32c-5db617cf9492": "foot",
    "a9dedbde-70d8-4e15-ae03-987671c9064a": "nav",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);