typeStudent  = (value) =>{
    if (value) {

      var d = new Date()

      this.db.list(this.types).update(value.user.uid + '/personalData', {

        name: this._parse.ParseText(this.name, "Registro"),

        surname: this._parse.ParseText(this.lastname, "Registro"),

        email: this._parse.ParseText(this.email.toLocaleLowerCase(), "Registro"),

        country: this.paisOption,

        city: this.filterCity,

        linkPhoto: this.linkPhoto,

        age: this.age,

        verifiedAccount: false,

        dateCreation: d.getTime(),

        ipCreation: this.MyIp + "",

        tel: this.tel



      }).then(() => {

        firebase.list('/roleByUser').update(value.user.uid, { type: "student" })

        firebase.list(this.types + '/' + value.user.uid + '/personalData').push({ hashLogin: "hashLogin" })

          .then((hash) => {

            firebase.list(this.types + '/' + value.user.uid + '/personalData/').update(hash.key, { hashLogin: hash.key })

            this.afAuth.auth.signOut()

              .then(() => {

                window.localStorage.clear()

                this.router.navigate(['/login'])

              })

          })

      })

    } else {

    }
  }

  typeTeacher = (value)  =>{
    if (value) {

      var branch = {

        myStudies: {

          basicStudies: {

            0: {

              date: 0,

              description: "",

              state: "",

              title: "",

              uninersity: ""

            }

          },

          languages: {

            0: {

              date: "",

              language: "",

              level: "",

            }

          },

          recognition: {

            0: {

              date: "",

              description: "",

              from: ""

            }

          },

          skills: {

            0: {

              level: "",

              type: ""

            }

          }

        }

      }

      // ***insersion de datos de teacher a la bd***

      var d = new Date()

      firebase.list(this.types).update(value.user.uid + '/personalData', {

        typeDocument: this.typesDocument,

        document: this.document,

        tel: this.tel,

        name: this._parse.ParseText(this.name, "Registro"),

        surname: this._parse.ParseText(this.lastname, "Registro"),

        email: this._parse.ParseText(this.email.toLocaleLowerCase(), "Registro"),

        verifiedAccount: false,

        progress: {

          approved: false,

          lenguage: false,

          recognition: false,

          resume: false,

          skills: false,

          student: false,

          video: false

        },

        country: this.paisOption,

        city: this.filterCity,

        linkPhoto: this.linkPhoto,

        working: '',

        schoolName: this.schoolOption,

        address: "",

        ranking: this.ranking,

        resume: "",

        dateCreation: d.getTime(),

        ipCreation: this.MyIp + ""

      }).then(() => {

        // firebase.list(this.types).update(value.user.uid, branch).then((value) => { })

        firebase.list('/roleByUser').update(value.user.uid, { type: "teacher" })

        firebase.list(this.types + '/' + value.user.uid + '/personalData').push({ hashLogin: "hashLogin" })

          .then((hash) => {

            firebase.list(this.types + '/' + value.user.uid + '/personalData/').update(hash.key, { hashLogin: hash.key })

            this.afAuth.auth.signOut()

              .then(() => {

                window.localStorage.clear()

                this.router.navigate(['/login'])

              })

          })

      })

    } else {

    }
  }

Register = () => {
    // ***metodo que registra un usuario***

      this.ageStudent()
  
      this.fecha()
  
      // ***insersion de datos de student profile a la bd***
  
      if (this.types == 'students') {
  
        if (this.age != '') {
  
          if (this.acudiente == true && this.correoAcudiente != '' && this.celularAcudiente != '' && this.celularAcudiente.toString().length == 10 && this.typeAcudiante != '' && this.nameAcudiente != '' || this.acudiente == false) {
  
            if (this.terminos) {
  
              if (this.tel != "" && this.tel.toString().length == 10) {
  
                if (this.password == this.repeatpassword) {
  
   
  
                  let val = firebase.auth.createUserWithEmailAndPassword(this.email.toLocaleLowerCase(), this.password);
  
                  val.catch((err) => {
  
                    this.showMessage(err.code)
  
                  })
  
                  val.then((value) => {
  
                    this.typeStudent(value)
  
                    // if (this.comodin) {
  
                    //   var date = new Date().getTime();
  
                    //   firebase.list('redeemedCodes/' + this.codePersonal).update(value.user.uid + '/', { stateRegister: true, statePay: false, date: date, plane: 0, typeUser: this.types })
  
                    // }
  
                    // this.http.get('https://www.myclassflix.com/mailer/webresources/api/send/students/' + value.user.uid + '/verify')
  
                    //   .subscribe(() => {
  
                    //   })
  
                    this._usr.sendEmailStudent(value.user.uid).then((res) => {
  
                      if (res.data.status == 202) {
  
                        this.showMessage("sendEmailValidate")
  
                      }
  
                      if (res.data.status != 202) {
  
                        this.showMessage('errorEmailValidate');
  
                      }
  
                      // this.validateReferido()
  
                    }).catch((error) => {
  
                      this.showMessage('errorServer');
  
                    })
  
                  })
  
                } else {
  
                  this.showMessage("errPass")
  
                }
  
              } else {
  
                this.showMessage("errTelephone")
  
              }
  
            } else {
  
              this.showMessage("errTerminos")
  
            }
  
          } else {
  
            this.showMessage("errDatosAcudiente")
  
          }
  
        } else {
  
          this.showMessage("errAge")
  
        }
  
        //   } else {
  
        //     this.showMessage("errTelephone")
  
        //   }
  
        // } else {
  
        //   this.showMessage("errTypeDocument")
  
   
  
        // }
  
        // } else {
  
        //   this.showMessage("errTypeDocument")
  
        // }
  
   
  
        // ***insersion de datos de teacher a la bd***
  
      } else if (this.types == 'teachers') {
  
        if (this.document != "") {
  
          if (this.terminos) {
  
            if (this.typesDocument != "Tipo") {
  
              if (this.password == this.repeatpassword) {
  
                if (this.tel != "" && this.tel == null ? '' : this.tel.toString().length == 10) {
  
                  let val = firebase.auth.createUserWithEmailAndPassword(this.email, this.password);
  
                  val.catch((err) => {
  
                    this.showMessage(err.code)
  
                  })
  
                  val.then((value) => {
  
                    // logica para qu un docente redima un codigo
  
                    // if (this.comodin) {
  
                    //   var date = new Date().getTime();
  
                    //   firebase.list('redeemedCodes/' + this.codePersonal).update(value.user.uid + '/', { stateRegister: true, statePay: false, date: date, plane: 0, typeUser: this.types })
  
                    // }
  
                    this.typeTeacher(value)
  
                    // this.router.navigate(['/home'])
  
                    // this.http.get('https://www.myclassflix.com/mailer/webresources/api/send/teachers/' + value.user.uid + '/verify')
  
                    //   .subscribe(() => {
  
   
  
                    //   })
  
                    this._usr.sendEmailTeacher(value.user.uid).then((res) => {
  
                      if (res.data.status == 202) {
  
                        this.showMessage("sendEmailValidate")
  
                      }
  
                      if (res.data.status != 202) {
  
                        this.showMessage('errorEmailValidate');
  
                      }
  
                    }).catch((error) => {
  
                      this.showMessage('errorServer');
  
                    })
  
                  })
  
                } else {
  
                  this.showMessage("errTelephone")
  
                }
  
              } else {
  
                this.showMessage("errPass")
  
              }
  
   
  
              // } else if (this.password == this.repeatpassword) {
  
              //   let val = this.firebase.auth.createUserWithEmailAndPassword(this.email, this.password);
  
              //   val.catch((err) => {
  
              //     this.showMessage(err.code)
  
              //   })
  
              //   val.then((value) => {
  
              //     this.typeTeacher(value)
  
              //     this.router.navigate(['/home'])
  
              //   })
  
   
  
            } else {
  
              this.showMessage("errTypeDocument")
  
            }
  
          } else {
  
            this.showMessage("errTerminos")
  
          }
  
   
  
        } else {
  
          this.showMessage("errTypeDocument")
  
        }
  
      }
}