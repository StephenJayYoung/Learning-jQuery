<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
  <script src="../lib/jquery.payment.js"></script>

  <style type="text/css" media="screen">
    .has-error input {
      border-width: 2px;
    }

    .validation.text-danger:after {
      content: 'Validation failed';
    }

    .validation.text-success:after {
      content: 'Validation passed';
    }
  </style>

  <script>
    jQuery(function($) {
      $('[data-numeric]').payment('restrictNumeric');
      $('.cc-number').payment('formatCardNumber');
      $('.cc-exp').payment('formatCardExpiry');
      $('.cc-cvc').payment('formatCardCVC');

      $.fn.toggleInputError = function(erred) {
        this.parent('.form-group').toggleClass('has-error', erred);
        return this;
      };

      $('form').submit(function(e) {
        e.preventDefault();

        var cardType = $.payment.cardType($('.cc-number').val());
        $('.cc-number').toggleInputError(!$.payment.validateCardNumber($('.cc-number').val()));
        $('.cc-exp').toggleInputError(!$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
        $('.cc-cvc').toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
        $('.cc-brand').text(cardType);

        $('.validation').removeClass('text-danger text-success');
        $('.validation').addClass($('.has-error').length ? 'text-danger' : 'text-success');
      });

    });
  </script>

</head>
<body>
  <div class="container">
    <h1>
      Buy some cool stuff
      <small><a class="btn btn-info btn-xs" href="https://github.com/stripe/jquery.payment"></a></small>
    </h1>
    <p>I have some cool stuff for you to buy!</p>
    <form novalidate autocomplete="on" method="POST">
      <div class="form-group">
        <label for="cc-number" class="control-label">What is your cc number? <small class="text-muted">[<span class="cc-brand"></span>]</small></label>
        <input id="cc-number" type="text" class="input-lg form-control cc-number" pattern="\d*" autocomplete="cc-number" placeholder="Card number" required>
      </div>

      <div class="form-group">
        <label for="cc-exp" class="control-label">When does it expire</label>
        <input id="cc-exp" type="text" class="input-lg form-control cc-exp" pattern="\d*" autocomplete="cc-exp" placeholder="Expires MM/YY" required>
      </div>

      <div class="form-group">
        <label for="cc-cvc" class="control-label">What is your security code?</label>
        <input id="cc-cvc" type="text" class="input-lg form-control cc-cvc" pattern="\d*" autocomplete="off" placeholder="Security code" required>
      </div>

      <button type="submit" class="btn btn-lg btn-primary">Submit!</button>

      <h2 class="validation"></h2>
    </form>
  </div>
</body>
</html>