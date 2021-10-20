const pond = FilePond.create({
  multiple: false,
  name: 'filepond',
  server: "/upload"
});

// Add it to the DOM
document.body.appendChild(pond.element);
