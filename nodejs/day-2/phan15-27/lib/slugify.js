export const stringToSlug = (str) => {
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i=0, l=from.length ; i < l ; i++) {
      str = str.replace(RegExp(from[i], "gi"), to[i]);
    }
  
    str = str.toLowerCase()
          .trim()
          .replace(/[^a-z0-9\-]/g, '-')
          .replace(/-+/g, '-');
  
    return str;
}

