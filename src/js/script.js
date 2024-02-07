/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.books-list .book__image',
        
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
      thisBooksList.initData();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;
      for (const book of dataSource.books){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating); 
        book.ratingWidth = book.rating * 10;
        
        /* generate HTML based on template*/
        const generatedHTML = templates.books(book);
              
        // console.log(generatedHTML);
        /* create element using utils.createElementFromHTML*/
        const domElement = utils.createDOMFromHTML(generatedHTML);
        console.log(domElement);
  
        /* find container*/
        const booksContainer = document.querySelector(select.containerOf.booksList);
        /* add dom element */
        booksContainer.appendChild(domElement);
      }   
    }
  
    // getElements() {
      
    // }
  
    initActions() {
      const thisBooksList = this;
      const bookDom = document.querySelector(select.containerOf.booksList);
      bookDom.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if ((event.target.offsetParent).classList.contains('book__image')){

          const bookActiv = event.target.alt;
          console.log(bookActiv);
          for (const book of dataSource.books) {
            if (book.name === bookActiv) {
              const bookDomActive = bookDom.querySelector(`[data-id="${book.id}"]`);

              if (!thisBooksList.favoriteBooks.includes(book.id)) {
                thisBooksList.favoriteBooks.push(book.id);
                bookDomActive.classList.add('favorite');
              }
              else {
                bookDomActive.classList.remove('favorite');
                let index = thisBooksList.favoriteBooks.indexOf(book.id);
                if (index !== -1) {
                  thisBooksList.favoriteBooks.splice(index, 1);
                }
              }
            }
          }
          console.log(thisBooksList.favoriteBooks);
        }
      });

      const filtersDom = document.querySelector(select.containerOf.filters);
      filtersDom.addEventListener('click', function (event) {
        const checkboxObject = event.target;
        console.log(checkboxObject.getAttribute('value'));

        //   if (checkboxObject.matches('input[value="adults"]') || checkboxObject.matches('input[value="nonFiction"]'))
        if (checkboxObject.getAttribute('value') === 'adults' || checkboxObject.getAttribute('value') ==='nonFiction')

        {
          if (checkboxObject.checked === true && !thisBooksList.filters.includes(checkboxObject.getAttribute('value'))){ 
            thisBooksList.filters.push(checkboxObject.getAttribute('value'));
          }
          else {
            let index = thisBooksList.filters.indexOf(checkboxObject.getAttribute('value'));
            if (index !== -1) {
              thisBooksList.filters.splice(index, 1);
            }
          }
        }
        console.log(thisBooksList.filters);
        thisBooksList.filterBooks();
        
      });
    }
  
    filterBooks() {
      const thisBooksList = this;
      for (const book of dataSource.books){
        const bookDomFilteroff = document.querySelector(`[data-id="${book.id}"]`);
        bookDomFilteroff.classList.remove('hidden');
        for (const filtersId of thisBooksList.filters){
          let bookDetails = book.details.adults ? 'adults' : book.details.nonFiction ? 'nonFiction':'noDetails';
          console.log(book, bookDetails);
          if (filtersId !== bookDetails ){
            bookDomFilteroff.classList.add('hidden');
          }
        }
      }
    }
    
    determineRatingBgc(argRating) {
      const thisBooksList = this;
      console.log(thisBooksList);
      let backgroundStyle;
      if (argRating < 6) backgroundStyle = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      if (argRating > 6 && argRating <= 8) backgroundStyle = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      if (argRating > 8 && argRating <= 9) backgroundStyle ='linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      if (argRating > 9) backgroundStyle  = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      return backgroundStyle;
    }
  
  }
  const app = new BooksList();
  app();
    
}

