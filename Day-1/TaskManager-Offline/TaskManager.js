(function(){
	window.addEventListener("DOMContentLoaded",init);

	window.applicationCache.addEventListener("updateready",onUpdateReadyTrigger);
	function onUpdateReadyTrigger(){
		document.getElementById("divUpdateReady").style.display = "block";
	}
	
	var btnAddTask
		, btnRemoveCompleted
		, txtTask
		, ulTaskList
		, btnUseUpdate
		, btnDontUseUpdate
		, storage = taskStorage();

	function init(){
		btnUseUpdate = document.getElementById("btnUseUpdate");
		btnUseUpdate.addEventListener("click", onBtnUseUpdateClick);

		btnDontUseUpdate = document.getElementById("btnDontUseUpdate");
		btnDontUseUpdate.addEventListener("click", onBtnDontUseUpdateClick);

		ulTaskList = document.getElementById("ulTaskList");
		txtTask = document.getElementById("txtTask");
		btnAddTask = document.getElementById("btnAddTask");
		btnRemoveCompleted = document.getElementById('btnRemoveCompleted');
		btnAddTask.addEventListener("click",onBtnAddTaskClicked);
		btnRemoveCompleted.addEventListener("click",onBtnAddRemoveCompletedClicked);
		loadTasksFromStorage();
		
		document.getElementById("divUpdateReady").style.display = "none";

		window.addEventListener("storage",onStorageTriggered);
	}

	function onBtnUseUpdateClick(){
		window.location.reload();
	}

	function onBtnDontUseUpdateClick(){
		document.getElementById("divUpdateReady").style.display = "none";
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
		if (task.isCompleted)
			newTaskItem.classList.add("completed");
		ulTaskList.appendChild(newTaskItem);
	}

	function onTaskItemClicked(){
		storage.toggleCompletion(this.getAttribute("task-id"));
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