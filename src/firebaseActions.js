export const fetchList = (database, path, callback) => { 
  return database.ref(path)
    .on('value', callback);
};

export const fetchItem = (database, path, id) => { 
  return database.ref(`${path}/${id}`)
    .once('value');
};

export const addItem = (database, path, item) => { 
  return database.ref(path)
    .push(item);
};

export const updateItem = (database, path, item) => { 
  return database.ref(`${path}/${item.id}`)
    .update(item);
};

export const removeItem = (database, path, id) => { 
  return database.ref(`${path}/${id}`)
    .remove();
};
