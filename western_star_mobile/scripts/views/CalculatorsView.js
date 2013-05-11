window.CalculatorsView = StateView.extend({
	lang_list:null,
	initialize:function (options) {
		if (this.firstLoad) {   
			this.onFirstLoad();
		}
	},
    onEnter:function() {
        app.mainView.setStrings();
		TweenLite.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});   
	},
	respond:function() {
		this.$el.find("#calculators").width(app.windowWidth);
		this.$el.find("#calculators").height(app.windowHeight);
		this.$el.find("#calculators_logo").css({"left":((this.$el.find("#logo_div").width() - this.$el.find("#calculators_logo").width()) / 2) + "px", "top":((this.$el.find("#top_div").height() - this.$el.find("#logo_div").height()) / 2) + "px"});
		this.$el.find("#calculators_title").css({"top":((this.$el.find("#top_div").height() - this.$el.find("#calculators_title").height()) / 2) + "px"});
		this.$el.find("#main_div").css({
			"top":(this.$el.find("#top_div").height()) + $("#header_bar").height() + "px",
			"height":app.windowHeight - this.$el.find("#top_div").height() - $(".footer").height() + "px"
		});
		this.$el.find("#bottom_frame").css({"top":app.windowHeight - this.$el.find("#bottom_image").height() - $(".footer").height() - this.$el.find("#main_div").offset().top + "px"});
		this.$el.find("#field_values_payments").height(app.windowHeight - this.$el.find("#top_div").height() - $(".footer").height() - this.$el.find("#bottom_image").height() - 50);
	},
	render:function() {
		this.template = _.template(tpl.get("calculators"));
		this.$el.html(this.template());
		TweenMax.to(this.$el.find("#power"), .01, {css:{autoAlpha:0}});
		var page = this;
		$.each(page.$el.find(".nav_item"), function(index, item) {
			$(item).click(function(evt) {
				if (!$(this).hasClass("active")) {
					page.$el.find(".nav_item").removeClass("active");
					page.$el.find("span").removeClass("active");
					page.$el.find("#icon").removeClass("active");
					$(this).addClass("active");
					$(this).find("span").addClass("active");
					$(this).find("#icon").addClass("active");
					if ($(this).attr("id") == "nav_payments") {
						page.navSelect("#payments");
					}
					else {
						page.navSelect("#power"); 
					}
				} 
			});
		});

		$(':input[id="sales_price"], :input[id="interest_rate"], :input[id="sales_tax"], :input[id="down_payment"], :input[id="financing_months"]').live('keyup', function(e) {
			page.calculatePayment();
		});
        
        $(':input[id="monthly_payment_power"], :input[id="financing_months_power"], :input[id="interest_rate_power"], :input[id="down_payment_power"], :input[id="sales_tax_power"]').live('keyup', function(e) {
			page.calculateEstimatedMax();
		});
	},
    
	numberWithCommas:function(n) {
		// format a decimal number to show commas 
		var parts = n.toString().split(".");
		return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	},
	reformatMoneyEntry:function(n) {
		n = n.replace(',', '');
		n = numberWithCommas(n);
	},
	calculatePayment:function() {
		var page = this;
		if ((page.$el.find('#sales_price').val() == '') ||
			(page.$el.find('#financing_months').val() == '') ||
			(page.$el.find('#interest_rate').val() == '')) {
			$.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "calculators_incomplete") {
					page.$el.find('#calculators_label_6').html(model.get(app.lang));
					page.$el.find('.calculators_result').html("$");
				}
			});
		}
		else {
			var truckPrice = page.$el.find('#sales_price').val();
			truckPrice = truckPrice.replace(',', '');
			var DownPayment = page.$el.find('#down_payment').val();
			DownPayment = DownPayment.replace(',', '');

			var SalesTax = page.$el.find('#sales_tax').val();
			if (SalesTax > 0)
				truckPrice = truckPrice * (1 + SalesTax / 100);
			var term = page.$el.find('#financing_months').val();
			truckPrice = truckPrice - DownPayment;

			var interestRate = page.$el.find('#interest_rate').val() / 1200;

			var finalResult = truckPrice * interestRate / (1 - (Math.pow(1 / (1 + interestRate), term)));
			finalResult = Math.round(finalResult * 100) / 100;
			finalResult = Math.floor(finalResult);
			finalResult = "$" + page.numberWithCommas(finalResult);
			$.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "calculators_label_6") {
					page.$el.find('#calculators_label_6').html(model.get(app.lang));
				}
			});
			page.$el.find('.calculators_result').html(finalResult);
		}
	},
	calculateEstimatedMax:function() {
        
		var page = this;
		if ((page.$el.find('#monthly_payment_power').val() == '') ||
			(page.$el.find('#financing_months_power').val() == '') ||
			(page.$el.find('#interest_rate_power').val() == '')) {
			$.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "calculators_incomplete") {
					page.$el.find('#calculators_label_12').html(model.get(app.lang));
					page.$el.find('.calculators_result_power').html("$");
				}
			});
		}
		else {
   
			var monthlyPayment = page.$el.find('#monthly_payment_power').val();

			var loanLength = page.$el.find('#financing_months_power').val();

			var interestRate = page.$el.find('#interest_rate_power').val() / 1200;
 
			var totalAmount = monthlyPayment / (interestRate / (1 - (Math.pow(1 / (1 + interestRate), loanLength))));
  
			var downPayment = page.$el.find('#down_payment_power').val() * 1.0;
			var subTotal = totalAmount + downPayment;
			var salesTax = 0;
			salesTax = page.$el.find('#sales_tax_power').val() * 1.0;

			if (salesTax > 0) {
				subTotal = subTotal / (1 + salesTax / 100);
			}
			totalAmount = Math.round(subTotal * 100) / 100;
			totalAmount = Math.floor(totalAmount);
			totalAmount = "$" + page.numberWithCommas(totalAmount);
            $.each(app.stringsCollection.models, function(index, model) {
				if (model.get("name") == "calculators_label_12") {
					page.$el.find('#calculators_label_12').html(model.get(app.lang));
				}
			});
			page.$el.find('.calculators_result_power').html(totalAmount);
		}
	},
	navSelect:function(val) {
        var t1 = val;
        var t2;
        if(t1 == "#payments")    {
            t2 = "#power";
            
        }    else{
            t2 = "#payments";
        }
        if(t2 == "#power")    {
            this.$el.find("#bottom_frame").html("<img id='bottom_image' src='./images/calculators/calculators_bottom_image.png' />");
        }
        if(t2 == "#payments")    {
            this.$el.find("#bottom_frame").html("<img id='bottom_image' src='./images/calculators/calculators_bottom_image2.png' />");
        }
        TweenMax.to(this.$el.find(t2), .3, {css:{autoAlpha:0}});
        TweenMax.to(this.$el.find(t1), .4, {css:{autoAlpha:1}, delay:.4});
	}
});