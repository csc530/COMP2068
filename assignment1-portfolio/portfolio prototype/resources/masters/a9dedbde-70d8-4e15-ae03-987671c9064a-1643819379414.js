jQuery("#simulation")
  .on("click", ".m-a9dedbde-70d8-4e15-ae03-987671c9064a .click,.m-a9dedbde-70d8-4e15-ae03-987671c9064a.click", function(event, data) {
    var jEvent, jFirer, cases;
    if(jimUtil.isAlternateModeActive()) return;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#m-a9dedbde-Text_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "target": [ "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_1 span" ],
                    "attributes": {
                      "color": "#282828"
                    }
                  },{
                    "target": [ ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_1 span" ],
                    "attributes": {
                      "color": "#282828"
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "target": [ "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_5 span",
                  "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_4 span",
                  "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_2 span" ],
                    "attributes": {
                      "color": "#B2B2B2"
                    }
                  },{
                    "target": [ ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_5 span",
                  ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_4 span",
                  ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_2 span" ],
                    "attributes": {
                      "color": "#B2B2B2"
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimMove",
                  "parameter": {
                    "target": [ "#m-a9dedbde-Line_2" ],
                    "top": {
                      "type": "nomove"
                    },
                    "left": {
                      "type": "exprvalue",
                      "value": {
                        "action": "jimPlus",
                        "parameter": [ {
                          "datatype": "property",
                          "target": "#m-a9dedbde-Line_2",
                          "property": "jimGetWidth"
                        },{
                          "action": "jimMultiply",
                          "parameter": [ {
                            "action": "jimDivide",
                            "parameter": [ {
                              "datatype": "property",
                              "target": "#m-a9dedbde-Line_1",
                              "property": "jimGetWidth"
                            },"4" ]
                          },"1" ]
                        } ]
                      }
                    },
                    "containment": true,
                    "effect": {
                      "type": "none",
                      "easing": "swing",
                      "duration": 300
                    }
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimResize",
                  "parameter": {
                    "target": [ "#m-a9dedbde-Line_2" ],
                    "width": {
                      "type": "exprvalue",
                      "value": "100"
                    },
                    "height": {
                      "type": "exprvalue",
                      "value": ""
                    }
                  },
                  "exectype": "parallel",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/b392d5b9-3c80-469b-8a23-73114dd6c185"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#m-a9dedbde-Text_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "target": [ "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_2 span" ],
                    "attributes": {
                      "color": "#282828"
                    }
                  },{
                    "target": [ ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_2 span" ],
                    "attributes": {
                      "color": "#282828"
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "target": [ "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_5 span",
                  "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_4 span",
                  "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_1 span" ],
                    "attributes": {
                      "color": "#B2B2B2"
                    }
                  },{
                    "target": [ ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_5 span",
                  ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_4 span",
                  ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_1 span" ],
                    "attributes": {
                      "color": "#B2B2B2"
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimMove",
                  "parameter": {
                    "target": [ "#m-a9dedbde-Line_2" ],
                    "top": {
                      "type": "nomove"
                    },
                    "left": {
                      "type": "exprvalue",
                      "value": {
                        "action": "jimPlus",
                        "parameter": [ {
                          "datatype": "property",
                          "target": "#m-a9dedbde-Line_2",
                          "property": "jimGetWidth"
                        },{
                          "action": "jimMultiply",
                          "parameter": [ {
                            "action": "jimDivide",
                            "parameter": [ {
                              "datatype": "property",
                              "target": "#m-a9dedbde-Line_1",
                              "property": "jimGetWidth"
                            },"4" ]
                          },"2" ]
                        } ]
                      }
                    },
                    "containment": true,
                    "effect": {
                      "type": "none",
                      "easing": "swing",
                      "duration": 300
                    }
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimResize",
                  "parameter": {
                    "target": [ "#m-a9dedbde-Line_2" ],
                    "width": {
                      "type": "exprvalue",
                      "value": "100"
                    },
                    "height": {
                      "type": "exprvalue",
                      "value": ""
                    }
                  },
                  "exectype": "parallel",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/b8d039b9-6383-4c4e-b4a3-48bef217903d"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#m-a9dedbde-Text_4")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "target": [ "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_4 span" ],
                    "attributes": {
                      "color": "#282828"
                    }
                  },{
                    "target": [ ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_4 span" ],
                    "attributes": {
                      "color": "#282828"
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "target": [ "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_5 span",
                  "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_2 span",
                  "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_1 span" ],
                    "attributes": {
                      "color": "#B2B2B2"
                    }
                  },{
                    "target": [ ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_5 span",
                  ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_2 span",
                  ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_1 span" ],
                    "attributes": {
                      "color": "#B2B2B2"
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimMove",
                  "parameter": {
                    "target": [ "#m-a9dedbde-Line_2" ],
                    "top": {
                      "type": "nomove"
                    },
                    "left": {
                      "type": "exprvalue",
                      "value": {
                        "action": "jimPlus",
                        "parameter": [ {
                          "datatype": "property",
                          "target": "#m-a9dedbde-Line_2",
                          "property": "jimGetWidth"
                        },{
                          "action": "jimMultiply",
                          "parameter": [ {
                            "action": "jimDivide",
                            "parameter": [ {
                              "datatype": "property",
                              "target": "#m-a9dedbde-Line_1",
                              "property": "jimGetWidth"
                            },"4" ]
                          },"3" ]
                        } ]
                      }
                    },
                    "containment": false,
                    "effect": {
                      "type": "none",
                      "easing": "swing",
                      "duration": 300
                    }
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimResize",
                  "parameter": {
                    "target": [ "#m-a9dedbde-Line_2" ],
                    "width": {
                      "type": "exprvalue",
                      "value": "100"
                    },
                    "height": {
                      "type": "exprvalue",
                      "value": ""
                    }
                  },
                  "exectype": "parallel",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/970bd2e1-335c-40d4-8ae0-4ac877f930db"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#m-a9dedbde-Text_5")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "target": [ "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_5 span" ],
                    "attributes": {
                      "color": "#282828"
                    }
                  },{
                    "target": [ ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_5 span" ],
                    "attributes": {
                      "color": "#282828"
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "target": [ "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_4 span",
                  "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_2 span",
                  "#m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_1 span" ],
                    "attributes": {
                      "color": "#B2B2B2"
                    }
                  },{
                    "target": [ ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_4 span",
                  ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_2 span",
                  ".m-a9dedbde-70d8-4e15-ae03-987671c9064a #m-a9dedbde-Text_1 span" ],
                    "attributes": {
                      "color": "#B2B2B2"
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimMove",
                  "parameter": {
                    "target": [ "#m-a9dedbde-Line_2" ],
                    "top": {
                      "type": "nomove"
                    },
                    "left": {
                      "type": "exprvalue",
                      "value": {
                        "action": "jimPlus",
                        "parameter": [ {
                          "datatype": "property",
                          "target": "#m-a9dedbde-Line_2",
                          "property": "jimGetWidth"
                        },{
                          "action": "jimMultiply",
                          "parameter": [ {
                            "action": "jimDivide",
                            "parameter": [ {
                              "datatype": "property",
                              "target": "#m-a9dedbde-Line_1",
                              "property": "jimGetWidth"
                            },"4" ]
                          },"4" ]
                        } ]
                      }
                    },
                    "containment": false,
                    "effect": {
                      "type": "none",
                      "easing": "swing",
                      "duration": 300
                    }
                  },
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimResize",
                  "parameter": {
                    "target": [ "#m-a9dedbde-Line_2" ],
                    "width": {
                      "type": "exprvalue",
                      "value": "115"
                    },
                    "height": {
                      "type": "exprvalue",
                      "value": ""
                    }
                  },
                  "exectype": "parallel",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/97ddeb3d-5115-441d-a27f-ee077a7a6666",
                    "transition": {
                      "type": "flow",
                      "duration": 700
                    }
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/97ddeb3d-5115-441d-a27f-ee077a7a6666"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  });