export const dropZoneTypes = {
  board: 'boardDropZone',
  item: 'itemDropZone'
};
export function draggable(node, data) {
  let state = data;

  node.draggable = true;
  node.style.cursor = 'grab';

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', state);
  }
  node.addEventListener('dragstart', handleDragStart);

  return {
    update(data) {
      state = data;
    },
    destroy() {
      node.removeEventListener('dragstart', handleDragStart);
    }
  };
}
export function dropZone(node, options) {
  let state = {
    dropEffect: 'move',
    dragOverClass: 'droppable',
    ...options
  };

  function handleDragEnter(e) {
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.add(state.dragOverClass);
  }

  function handleDragLeave(e) {
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.remove(state.dragOverClass);
  }
  function handleDragOver(e) {
    e.preventDefault();
    if (!e.dataTransfer) return;
    e.dataTransfer.dropEffect = state.dropEffect;
  }

  function handleDrop(e) {
    e.preventDefault();
    if (!e.dataTransfer) return;

    const data = e.dataTransfer.getData('text/plain');

    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.remove(state.dragOverClass);
    state.onDropZone(data, e);
  }

  node.addEventListener('dragenter', handleDragEnter);
  node.addEventListener('dragleave', handleDragLeave);
  node.addEventListener('dragOver', handleDragOver);
  node.addEventListener('drop', handleDrop);
}
