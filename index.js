import Toastly from "@msic89/toastly";

const toast = new Toastly();

const $ = function (el) {
  el = document.querySelector(el);
  return el;
};

$("#toast-1").addEventListener("click", function () {
  toast.error(
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam amet
    expedita, dolorem tempora sint sed modi assumenda vitae veritatis saepe rem
    corporis non illo magni, perspiciatis exercitationem fugit hic ipsum.`,
    {
      position: "top-left",
    }
  );
});

$("#toast-2").addEventListener("click", function () {
  toast.show(`Send us <b>an email</b> to get support`, {
    position: "top-center",
    background: "coral",
    color: "#000",
  });
});

$("#toast-3").addEventListener("click", function () {
  toast.success(`Lorem ipsum dolor sit amet consectetur adipisicing elit.`, {
    position: "top-right",
  });
});
$("#toast-4").addEventListener("click", function () {
  toast.info(
    `Lorem ipsum <b>dolor sit amet consectetur</b> adipisicing elit.`,
    {
      position: "bottom-left",
    }
  );
});
$("#toast-5").addEventListener("click", function () {
  toast.warming(`Lorem ipsum dolor sit amet consectetur adipisicing elit.`, {
    position: "bottom-center",
  });
});
$("#toast-6").addEventListener("click", function () {
  toast.success(`Lorem ipsum dolor sit amet consectetur adipisicing elit.`, {
    position: "bottom-right",
  });
});
