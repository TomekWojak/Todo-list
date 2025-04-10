
document.addEventListener('DOMContentLoaded', function(){
    const counterInfoBottom = document.querySelector('.counter-info-bottom')
    const counterInfo = document.querySelector('.counter-info')
    const addBtn = document.querySelector('.addBtn')
    const popup = document.querySelector('.popup')
    const popupMsg = document.querySelector('.popup-msg')
    const popupInput = document.querySelector('.popup-input')
    const confirmBtn = document.querySelector('.confirm')
    const cancelBtn = document.querySelector('.cancel')
    const ulList = document.querySelector('.list')
    const editPopup = document.querySelector('.edit-popup')
    const editPopupMsg = document.querySelector('.edit-popup-msg')
    const editInput = document.querySelector('.edit-input')
    const acceptEditPopupBtn = document.querySelector('.accept')
    const closeEditPopupBtn = document.querySelector('.dissmis')
    let newTask
    let editedTask

    const openPopup = () => {
        popup.classList.toggle('active')
        editPopup.classList.remove('active')
    }

    const addListElement = () => {
        if(popupInput.value !== ''){
            newTask = document.createElement('li')
            newTask.textContent = popupInput.value
            addTools()

            ulList.append(newTask)

            changeCounter()

            popup.classList.remove('active')
            popupInput.value = ''
            popupMsg.textContent = ''
        }else {
            popupMsg.textContent = 'Musisz podać jakąś wartość!'
        }
    }

    const addTools = () => {
        const toolsBox = document.createElement('div')
        toolsBox.classList.add('tools')

        const completeBtn = document.createElement('button')
        completeBtn.classList.add('complete')
        completeBtn.innerHTML = '<i class="fa-solid fa-check toolsIcon"></i>'

        const editBtn = document.createElement('button')
        editBtn.classList.add('edit')
        editBtn.innerHTML = '<i class="fa-solid fa-pen toolsIcon"></i>'

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark toolsIcon"></i>'

        newTask.append(toolsBox)
        toolsBox.append(completeBtn, editBtn, deleteBtn)
    }

    const closePopup = () => {
        popup.classList.remove('active')
        popupInput.value = ''
        popupMsg.textContent = ''
    }


    const generalEdit = (e) => {
        if(e.target.matches('.complete')){
            completeFunction(e)
            checkIfDone()
        }else if(e.target.matches('.edit')){
            showeditFunction(e)
        }else if(e.target.matches('.delete')){
            deleteFunction(e)
            changeCounter()
            checkIfDone()
        }
    }

    const completeFunction = (e) => {
        editedTask = e.target.closest('li')
        editedTask.classList.toggle('completed')
    }

    const showeditFunction = (e) => {
        popup.classList.remove('active')
        editPopup.classList.toggle('active')
        newTask = e.target.closest('li')
        editInput.value = newTask.firstChild.textContent
    }

    const editFunction = () => {
        if(editInput.value !== ''){
            newTask.firstChild.textContent = editInput.value
            editPopup.classList.remove('active')

            editPopupMsg.textContent = ''
            editInput.value = ''
        }else {
            editPopupMsg.textContent = 'Najpierw coś wpisz!'
        }
    }

    const closeEditPopup = () => {
        editPopup.classList.remove('active')
        editInput.value = ''
        editPopupMsg.textContent = ''
    }


    const deleteFunction = (e) => {
        e.target.closest('li').remove()
    }

    const changeCounter = () => {
        const allListItems = document.querySelectorAll('.list li')
        if(allListItems.length === 0){
            counterInfo.textContent = 'Brak zadań na liście'
        }else {
            counterInfo.textContent = `Liczba zadań na liście: ${allListItems.length}`
        }
    }

    const isCompleted = (item) => {
        return item.classList.contains('completed')
    }


    const checkIfDone = () => {
        const allListItems = Array.from(document.querySelectorAll('.list li')) 
        const checkifCompleted = allListItems.filter(isCompleted)

        if(checkifCompleted.length !== 0){
            counterInfoBottom.style.textAlign = 'left'
            counterInfoBottom.textContent = `Liczba ukończonych zadań: ${checkifCompleted.length}`
        }else {
            counterInfoBottom.textContent = 'Nie masz żadnych ukończonych zadań'
        }
    }

    const enterInit = (e) => {
        if(e.key === 'Enter' && popup.classList.contains('active')){
            addListElement()
        }else if(e.key === 'Enter' && editPopup.classList.contains('active')) {
            editFunction()
        }
    }

    // EVENTS

    popupInput.addEventListener('keyup', enterInit)
    editInput.addEventListener('keyup', enterInit)
    closeEditPopupBtn.addEventListener('click', closeEditPopup)
    acceptEditPopupBtn.addEventListener('click', editFunction)
    ulList.addEventListener('click', generalEdit)
    cancelBtn.addEventListener('click', closePopup)
    confirmBtn.addEventListener('click', addListElement)
    addBtn.addEventListener('click', openPopup)

})