
;(function($) {

    var cookieMessage = {

        options: {},

        defaults: {
            position: "head",
            bgcolor: "#ccc",
            color: "#333",
            loadStyles: true,
            message: "This site uses cookies. By continuing to browse this site you are agreeing to our use of cookies. Please click <a target='_blank' href='http://blog.adayguerra.com/terms'>here</a> for more information."
        },

        initialize: function() {

            var self = this;

            /** Get URL arguments */
            this.getArguments();

            $(document).delegate('.cookieMessageClose', 'click', function() {
                self.closeMessage();
                return false;
            });

            /** Show message if not dismissed already */
            if ( !localStorage.getItem('hideCookieMessage') )
                this.showMessage();

        },

        getArguments: function() {

            /** Get the argumenets from URL parameters */
            var url = $('#cookieMessage').attr('src').split('?')[1],
                options = {};

            /** Add custom parameters if specified */
            if ( url ) {
                var params = url.split('&');

                /** Split keys and values into an object */
                for ( var x in params ) {
                    var parts = params[x].split('=');
                    options[parts[0]] = parts[1];
                }
            }

            /** Add params to options */
            this.options = $.extend({}, this.defaults, options);

        },

        closeMessage: function() {

            /** Remove message if exists and store hidden state */
            if ( this.$message ) {
                this.$message.slideUp({ duration: 400, easing: 'swing', complete: function() {
                    $(this).remove();
                }});
            }
            if ( this.$pusher ) {
                this.$pusher.slideUp({ duration: 400, easing: 'swing', complete: function() {
                    $(this).remove();
                }});
            }
            localStorage.setItem('hideCookieMessage', true);

        },

        showMessage: function() {

            /** Append styling */
            if ( this.options.loadStyles !== "false" )
                this.$styling = $('<style type="text/css">#pusher {height: 50px;width:100%} .cookieMessage { z-index: 10000 !important;font-size: 15px; position: fixed; left: 10px; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; -o-border-radius: 5px; background-color: '+ this.options.bgcolor +'; color: '+ this.options.color +'; } .cookieMessagehead { top: 0; } .cookieMessagefooter { bottom: 10px; } .cookieMessage .cookiecontainer {text-align: left;padding: 10px} .cookieMessage p {position: relative; padding: 0; margin: 0 0 0 40px } .cookieMessage a {color: '+ this.options.color +' ; text-decoration: underline; } .cookieMessageClose { background: url("https://s3.amazonaws.com/wsscripts/close.png") no-repeat top center; background-size: 30px;opacity:0.4;float: left; width: 30px;height: 40px } .cookieMessageClose:hover {opacity: 1} @media screen and (max-width: 1000px) { .cookieMessage .cookiecontainer {width: 100%} }</style>').appendTo('head');

            /** Append message to body */
            this.$message = $('<div id="cookieMessage" class="cookieMessage cookieMessage'+ this.options.position +'" style="display: none;"><div class="cookiecontainer"><a href="#" class="cookieMessageClose"></a><p>'+ this.options.message +' </p></div></div>').appendTo('body').slideDown({ duration: 400, easing: 'swing' });
            // this.$pusher = $('<div id="pusher">&nbsp</div>').prependTo('body').slideDown({ duration: 400, easing: 'swing' });



        },

    };

    $(document).ready(function() {
        cookieMessage.initialize();
    });

})(jQuery);
