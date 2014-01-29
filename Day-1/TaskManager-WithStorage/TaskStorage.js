function taskStorage(){
	var storage = window.localStorage;
	function addTask(taskName){
		var newId = new Date().getTime().toString();
		storage.setItem(newId,taskName);
		return {
			id : newId,
			name : taskName
		};
	}

	function removeTask(id){
		return storage.removeItem(id);
	}

	function getAllTasks(){
		var tasks = [];
		for(var i=0;i<storage.length;i++){
			var id = storage.key(i);
			var task = {
				id : id,
				name : storage.getItem(id)
			};
			tasks.push(task);
		}
		return tasks;
	}
	return {
		add : addTask,
		remove : removeTask,
		getAll : getAllTasks
	};
}