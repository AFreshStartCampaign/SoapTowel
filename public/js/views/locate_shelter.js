
// { data: { term, zipcode }, success, error }
function search (data, success, error) {
  $.get('/api/search', data, success, 'json');
}
