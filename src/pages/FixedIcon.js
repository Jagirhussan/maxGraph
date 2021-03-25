/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  FixedIcon example for mxGraph. This example demonstrates
  customizing the icon position in the mxLabel shape.
 */

import React from 'react';
import mxEvent from '../mxgraph/util/mxEvent';
import mxGraph from '../mxgraph/view/mxGraph';
import mxRubberband from '../mxgraph/handler/mxRubberband';
import mxUtils from "../mxgraph/util/mxUtils";
import mxConstants from "../mxgraph/util/mxConstants";
import mxLabel from "../mxgraph/shape/mxLabel";
import mxRectangle from "../mxgraph/util/mxRectangle";

class FixedIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    // A container for the graph
    return (
      <>
        <h1>Fixed icon example for mxGraph</h1>
        <div
          ref={el => {
            this.el = el;
          }}
          style={{
            overflow: 'hidden',
            position: 'relative',
            width: '321px',
            height: '241px',
            background: "url('editors/images/grid.gif')",
            cursor: 'default',
          }}
        />
      </>
    );
  };

  componentDidMount = () => {
    // Overrides the image bounds code to change the position
    mxLabel.prototype.getImageBounds = function(x, y, w, h) {
      const iw = mxUtils.getValue(
        this.style,
        mxConstants.STYLE_IMAGE_WIDTH,
        mxConstants.DEFAULT_IMAGESIZE
      );
      const ih = mxUtils.getValue(
        this.style,
        mxConstants.STYLE_IMAGE_HEIGHT,
        mxConstants.DEFAULT_IMAGESIZE
      );

      // Places the icon
      const ix = (w - iw) / 2;
      const iy = h - ih;

      return new mxRectangle(x + ix, y + iy, iw, ih);
    };

    // Makes the shadow brighter
    mxConstants.SHADOWCOLOR = '#C0C0C0';

    // Creates the graph inside the given container
    const graph = new mxGraph(this.el);

    // Uncomment the following if you want the container
    // to fit the size of the graph
    // graph.setResizeContainer(true);

    // Enables rubberband selection
    new mxRubberband(graph);

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    try {
      const v1 = graph.insertVertex(
        parent,
        null,
        'Fixed icon',
        20,
        20,
        80,
        50,
        'shape=label;image=images/plus.png;imageWidth=16;imageHeight=16;spacingBottom=10;' +
          'fillColor=#adc5ff;gradientColor=#7d85df;glass=1;rounded=1;shadow=1;'
      );
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
  };
}

export default FixedIcon;
