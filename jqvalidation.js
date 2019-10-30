var errMsgPlace = 'before'; /* value : after , before */
var custMessage = false; /*value : true , false */
var errClass = 'validation-error';
var thisField = 'This Field';

var vError = {
    'req': '<div class="' + errClass + '">{THISFIELD} is required</div>',
    'maxlength': '<div class="' + errClass + '">You exceed maximum length, Maximum length is {MAXLENGTH}</div>',
    'minlength': '<div class="' + errClass + '">Please correct the information , Minimum length {MINLENGTH} </div>',
    'min': '<div class="' + errClass + '">Please enter minimum value, Minimum value is {MINIMUMVALUE}</div>',
    'max': '<div class="' + errClass + '">You exceed maximum value, Maximum value is {MAXIMUMVALUE}</div>',
    'pattern': '<div class="' + errClass + '">Invalid value</div>',
    'fileType': '<div class="' + errClass + '">Invalid filetype</div>',
};

var defaultPatternList = {
    'email': '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    'url': '^(https?|s?ftp):\\/\\/(((([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:)*@)?(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|((([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.?)(:\\d*)?)(\\/((([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)+(\\/(([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)*)*)?)?(\\?((([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)|[\uE000-\uF8FF]|\\/|\\?)*)?(#((([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)|\\/|\\?)*)?$'
};

window.onload = function () {
    if (window.jQuery) {
        /* Form Submit Validate */
        formValidation = function (element, e) {
            var valid = true;
            $(element).attr("novalidate", "");
            $(element + ' .validation-error').remove();


            /* Text , Textarea , Number */

            $('input[type="text"],input[type="number"],input[type="password"],input[type="url"],input[type="email"],input[type="search"],input[type="tel"],textarea').each(function () {

                var curr = $(this);
                var val = curr.val().trim();
                var errMsgTxt = '';
                if (curr.attr('required') && val == '') {
                    errMsgTxt = vError.req.replace('{THISFIELD}', curr.attr('fieldname') ? curr.attr('fieldname') : thisField);
                } else if (curr.attr('maxlength') && curr.val().length >= curr.attr('maxlength')) {
                    errMsgTxt = vError.maxlength.replace('{MAXLENGTH}', curr.attr('maxlength'));
                } else if (curr.attr('minlength') && curr.val().length < curr.attr('minlength')) {
                    errMsgTxt = vError.minlength.replace('{MINLENGTH}', curr.attr('minlength'));
                } else if (curr.attr('min') && parseFloat(curr.val()) < curr.attr('min')) {
                    errMsgTxt = vError.min.replace('{MINIMUMVALUE}', curr.attr('min'));
                } else if (curr.attr('max') && parseFloat(curr.val()) > curr.attr('max')) {
                    errMsgTxt = vError.max.replace('{MAXIMUMVALUE}', curr.attr('max'));
                } else if (curr.attr('pattern') && curr.attr('pattern') !== false) {
                    var pettern = new RegExp(curr.attr('pattern'));
                    if (!pettern.test(curr.val())) {
                        errMsgTxt = vError.pattern;
                    }
                } else if (!curr.attr('pattern') && (curr.attr('type') == 'email' || curr.attr('type') == 'url')) {
                    if (curr.attr('type') == 'email') {
                        var pettern = new RegExp(defaultPatternList.email);
                    }
                    if (curr.attr('type') == 'url') {
                        var pettern = new RegExp(defaultPatternList.url);
                    }
                    if (!pettern.test(curr.val())) {
                        errMsgTxt = vError.pattern;
                    }
                }

                if (errMsgTxt != '') {
                    valid = false;
                }

                /* Print message */
                if (errMsgPlace == 'after') {
                    curr.after(errMsgTxt);
                } else {
                    curr.before(errMsgTxt);
                }
                /* Print message */

            });

            $('input[type="file"]').each(function (e) {
                var curr = $(this);
                var currFile = curr[0];
                var errMsgTxt = '';

                if (curr.attr('required') && currFile.files.length == 0) {
                    errMsgTxt = vError.req.replace('{THISFIELD}', curr.attr('fieldname') ? curr.attr('fieldname') : thisField);
                }

                if (currFile.files.length > 0) {
                    $.each(currFile.files, function (i, files) {
                        var getExt = files['name'].split('.').reverse()[0].toLowerCase();
                        if (curr.attr('allowtypes') && curr.attr('allowtypes') !== false) {
                            var allowTypes = curr.attr('allowtypes').toLowerCase().split(',');
                            if ($.inArray(getExt, allowTypes) == -1) {
                                valid = false;
                                errMsgTxt = vError.fileType;
                            }
                        }
                    });
                }

                /* Print message */
                if (errMsgPlace == 'after') {
                    curr.after(errMsgTxt);
                } else {
                    curr.before(errMsgTxt);
                }
                /* Print message */

            });

            if (!valid) {
                e.preventDefault();
            }
        }

        /* Form Submit Validate */


    } else {

        alert("jQuery is not loaded");
    }
};
