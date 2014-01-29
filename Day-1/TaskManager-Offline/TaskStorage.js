function taskStorage(){
	var storage = window.localStorage;
	function addTask(taskName){
		var newId = new Date().getTime().toString();
		var newTask = {
			id : newId,
			name : taskName,
			isCompleted : false
		};
		storage.setItem(newId,window.JSON.stringify(newTask));
		return newTask;
	}

	function removeTask(id){
		return storage.removeItem(id);
	}

	function toggleCompletion(id){
		var task = window.JSON.parse(storage.getItem(id));
		task.isCompleted = !task.isCompleted;
		storage.setItem(id,window.JSON.stringify(task));
	}

	function getAllTasks(){
		var tasks = [];
		for(var i=0;i<storage.length;i++){
			var task = window.JSON.parse(storage.getItem(storage.key(i)));
			tasks.push(task);
		}
		return tasks;
	}
	return {
		add : addTask,
		remove : removeTask,
		getAll : getAllTasks,
		toggleCompletion : toggleCompletion
	};
}