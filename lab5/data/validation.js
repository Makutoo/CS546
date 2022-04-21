module.exports = {
    checkId(id) {
      if (!id) throw 'Error: You must provide an id to search for';
      if (typeof id !== 'string') throw 'Error: id must be a string';
      id = id.trim();
      if (id.length === 0)throw 'Error: id cannot be an empty string or just spaces';
      for(let i = 0; i < id.length; i++) {
        let c = id.charAt(i);
        if(c < '0' || c > '9') {
          throw 'invaild id'
        }
      }
      return id;
    },
  };