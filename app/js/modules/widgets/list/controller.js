/*
The Widgets list controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define(['app', './view', 'regions/modalRegion'], function(App, View, ModalRegion){
    var module = App.module('Widgets.List', function(List, App, Backbone, Marionette, $, _){
        var getIdFromXhrLocation = function(xhr){
            var id;
            
            if(xhr.status === 201){
                var location = xhr.getResponseHeader('location');
                var fragments = location.split('/');
                id = fragments[fragments.length - 1];
            }
            
            return id;
        };
        
        var newModal = function(widgets){
            require(['modules/widgets/new/view'], function(NewView){
                var newWidget = App.request('widget:entity:new');
                
                var newView = new NewView.Widget({
                    model: newWidget
                });
                
                newView.on('form:submit', function(data){
                    var saveStatus = newWidget.save(
                        data,
                        {
                            error: function(model, xhr, options){
                                var id = getIdFromXhrLocation(xhr);
                                
                                if(id){
                                    model.set('id', id);
                                    widgets.add(model);
                                    // TODO flash
                                }
                            }
                        }
                    );
                    
                    if(saveStatus){
                        App.modalRegion.reset();
                    } else {
                        newView.triggerMethod('form:data:invalid', newWidget.validationError);
                    }
                });
                
                App.modalRegion.show(newView);
            });
        };

        List.Controller = {
            list: function(criterion){
                require(['modules/widgets/entities'], function(){
                    // Display loading spinner
                    var layout = new View.Layout();
                    var panel = new View.Panel();
                    
                    var fetching = App.request('widget:entities');
                
                    $.when(fetching).done(function(widgets){
                        var list = new View.Widgets({
                            collection: widgets
                        });
                        
                        layout.on('show', function(){
                            layout.panelRegion.show(panel);
                            layout.contentRegion.show(list);
                        });

                        list.on('itemview:widget:delete', function(childView, model){
                            model.destroy();
                        });

                        list.on('itemview:widget:edit', function(childView, model){
                            App.trigger('widget:edit', model.get('id'));
                        });
                        
                        list.on('itemview:widget:show', function(childView, model){
                            App.trigger('widget:show', model.get('id'));
                        });
                        
                        panel.on('widget:new', function(){
                            newModal(widgets);
                        });
                        
                        App.mainRegion.show(layout);
                    });
                });
            }
        };
    });
    
    return App.Widgets.List.Controller;
});