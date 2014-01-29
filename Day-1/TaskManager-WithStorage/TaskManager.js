(function(){
	window.addEventListener("DOMContentLoaded",init);
	var btnAddTask
		, btnRemoveCompleted
		, txtTask
		, ulTaskList
		, storage = taskStorage();

	function init(){
		ulTaskList = document.getElementById("ulTaskList");
		txtTask = document.getElementById("txtTask");
		btnAddTask = document.getElementById("btnAddTask");
		btnRemoveCompleted = document.getElementById('btnRemoveCompleted');
		btnAddTask.addEventListener("click",onBtnAddTaskClicked);
		btnRemoveCompleted.addEventListener("click",onBtnAddRemoveCompletedClicked);
		loadTasksFromStorage();
		window.addEventListener("storage",onStorageTriggered);
	}

	function onStorageTriggered(storageEvent){
		loadTasksFromStorage();
	}

	function loadTasksFromStorage(){
		ulTaskList.innerHTML = "";
		var tasks = storage.getAll();
		for(var i=0;i<tasks.length;i++){
			addTaskToUI(tasks[i]);
		}
	}

	function onBtnAddTaskClicked(){
		
		var taskName = txtTask.value;
		var newTask = storage.add(taskName);
		addTaskToUI(newTask);
	}

	function addTaskToUI(task){
		var newTaskItem = document.createElement("li");
		newTaskItem.innerText = task.name;
		newTaskItem.addEventListener("click",onTaskItemClicked);
		newTaskItem.setAttribute("task-id",task.id);
		ulTaskList.appendChild(newTaskItem);
	}

	function onTaskItemClicked(){
		if (this.classList.contains("completed")){
			this.classList.remove("completed");
		} else {
			this.classList.add("completed");
		}
	}

	function onBtnAddRemoveCompletedClicked(){
		var taskItems = ulTaskList.children;
		for(var i=taskItems.length-1;i>=0;i--){
			var taskItem = taskItems[i];
			if (taskItem.classList.contains("completed")){
				taskItem.removeEventListener("click",onTaskItemClicked);
				var taskIdToRemove = taskItem.getAttribute("task-id");
				storage.remove(taskIdToRemove);
				ulTaskList.removeChild(taskItem);
			}
		}
	}
})();