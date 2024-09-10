Known Issue: Inconsistent Shape Resizing on Canvas
Description:

When adding new shapes to the canvas, there is an issue with resizing these shapes. Users may notice that the newly added shapes do not resize correctly or as expected. This could manifest as shapes not maintaining their proportions, resizing unevenly, or not responding to size adjustments in real-time.

Cause:

This issue may stem from how the shape dimensions and scaling factors are managed when the shapes are first instantiated and rendered on the canvas. The current resizing logic might not be correctly handling the shape's width, height, or aspect ratio adjustments, particularly when user interactions like dragging or input scaling occur.

Steps to Reproduce:

Add a new shape (e.g., rectangle, circle) to the canvas.
Attempt to resize the shape using the provided controls (e.g., drag corners or edges).
Observe that the shape does not resize correctly, such as disproportionate changes or no visible resizing effect.

Suggested Improvement:

To address this, consider refining the resizing algorithm for new shapes.