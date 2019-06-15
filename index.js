var puppeteer = require('puppeteer');
var http = require("http");
async function generatePDF() {
var browser = await puppeteer.launch();
  var page = await browser.newPage();
  await page.goto('https://desolate-mesa-51130.herokuapp.com', {waitUntil: 'networkidle2'});
  // page.pdf() is currently supported only in headless mode.
  // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
  await page.pdf({
    path: 'hn.pdf',
    format: 'letter'
  });

  await browser.close();
}

    $(document).ready(function () {
      //var Api2Pdf = require('api2pdf');   
      //var a2pClient = new Api2Pdf('591b4741-015b-40c1-a51c-21e77ce15bbb');
      //var company=["apple", "microsoft", "google"];
      //  $('input.autocomplete').autocomplete({
      //  source: company
      // });
      //});

      $('input.autocomplete').keyup(function (event) {
        event.preventDefault();
        $("#sug").empty();
        var truefalse = true;
        console.log("h");
        var selected = "";
        var company = $('input.autocomplete').val().trim();
        console.log(company);
        $.ajax({
          type: "GET",
          url: "https://autocomplete.clearbit.com/v1/companies/suggest?query=" + company,
          async: true,
          dataType: "json",
          success: function (response) {
            var outArr = [];
            //console.log(response);
            //console.log(response[0]);
            //console.log(response.length);
            for (var x = 0; x < response.length; x++) {
              //console.log(response[x].name);
              var div = $("<div>");
              div.text(response[x].name);
              div.attr("data-name", response[x].name);
              div.addClass("companySug");
              $("#sug").append(div);
            }
            $(".companySug").off();
            $(".companySug").on("click", function (event) {
              if (truefalse === true) {
                event.preventDefault();
                console.log("hola");
                selected = $(this).attr("data-name");
                $('input.autocomplete').text(selected);
                // var selected = $(this).val();
                //console.log($(this));
                console.log("selected " + selected);
                truefalse = false;
              }
              else {
                console.log("not");
              }
            })
          },
          error: function (xhr, status, err) {
            // This time, we do not end up here!

          }
        });
      });
      $("#submit").off();
      $("#submit").on("click", function generatePDF(event) {
        event.preventDefault();
        var print = $(".html");
        html2pdf().from(print).save();
      });
    })



