/*
The modalRegion region.

From: 
http://www.joezimjs.com/javascript/using-marionette-to-display-modal-views/
*/
'use strict';

/* global define */
/*jshint -W098 */
define(['marionette', 'underscore'], function(Marionette, _){
    var ModalRegion = Marionette.Region.extend({
        constructor: function() {
            Marionette.Region.prototype.constructor.apply(this, arguments);
            this.ensureEl();
            
            this.$el.on('hidden', {region:this}, function(event) {
                event.data.region.close();
            });
        },
 
        onShow: function() {
            this.$el.modal('show');
        },
 
        onClose: function() {
            this.$el.modal('hide');
        }
    });

    return ModalRegion;
});
