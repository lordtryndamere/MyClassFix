this.db.database.ref('approveds/').once('value', data => {

    const teachers = data.val();



    for (const key in teachers) {

      let name = ""

      let surname = ""

      let ranking = ""

      let country = ""

      let photo = ""

      let myCalendar = []

      let mobj = [{ idiomas: [] }, { musica: [] }, { tecnologia: [] }, { universidad: [] }, { secundaria: [] }, { primaria: [] }, { otros: [] }]

      let tags = []

      let skill = []

      let type = []

      let skl = []



      this.db.database.ref('teachers/' + key + '/personalData/name').once('value', value => {

        name = value.val()

      }).then(() => {

        this.db.database.ref('teachers/' + key + '/personalData/surname').once('value', value => {

          surname = value.val()

        }).then(() => {

          this.db.database.ref('teachers/' + key + '/personalData/ranking').once('value', value => {

            ranking = value.val()

          }).then(() => {

            this.db.database.ref('teachers/' + key + '/personalData/country').once('value', value => {

              country = value.val()

            }).then(() => {

              this.db.database.ref('teachers/' + key + '/personalData/linkPhoto').once('value', value => {

                photo = value.val()

              }).then(() => {

                this.db.database.ref('teachers/' + key + '/newCalendar/week').once('value', value => {

                  myCalendar = value.val()

                }).then(() => {

                  this.db.database.ref('teachers/' + key + '/personalData/tags').once('value', value => {

                    const snapshot = value.val()

                    for (const i in snapshot) {

                      for (const j in snapshot[i]) {

                        for (const k in snapshot[i][j]) {

                          tags.push(this.eliminarDiacriticos(snapshot[i][j][k].value))

                        }

                      }

                    }

                  }).then(() => {

                    this.db.database.ref('teachers/' + key + '/newSkill').once('value', value => {

                      const snapshot = value.val()

                      for (const i in snapshot) {

                        type.push(this.eliminarDiacriticos(i))

                        for (const j in snapshot[i]) {

                          for (const k in snapshot[i][j]) {

                            // skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))



                            if (i == 'Idiomas') {

                              this.idiomasAcentos.forEach(val => {

                                if (this.eliminarDiacriticos(val) == j) {

                                  mobj[0]['idiomas'].push(val);

                                  skill.push(this.eliminarDiacriticos(val))

                                  skl.push(val)

                                }

                              })

                            } else if (i == 'Musica') {

                              mobj[1]['musica'].push(snapshot[i][j][k].skill)

                              skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                              skl.push(snapshot[i][j][k].skill)

                            } else if (i == 'Tecnologia') {

                              mobj[2]['tecnologia'].push(snapshot[i][j][k].skill)

                              skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                              skl.push(snapshot[i][j][k].skill)

                            } else if (i == 'Universidad') {

                              mobj[3]['universidad'].push(snapshot[i][j][k].skill)

                              skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                              skl.push(snapshot[i][j][k].skill)

                            } else if (i == 'Secundaria') {

                              mobj[4]['secundaria'].push(snapshot[i][j][k].skill)

                              skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                              skl.push(snapshot[i][j][k].skill)

                            } else if (i == 'Primaria') {

                              mobj[5]['primaria'].push(snapshot[i][j][k].skill)

                              skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                              skl.push(snapshot[i][j][k].skill)

                            } else if (i == 'Otros') {

                              mobj[6]['otros'].push(snapshot[i][j][k].skill)

                              skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                              skl.push(snapshot[i][j][k].skill)

                            }

                          }

                        }

                      }

                      mobj[0]['idiomas'] = this.elementsNoRepeat(mobj[0]['idiomas']);

                    }).then(() => {

                      var obj = {

                        id: key,

                        name: name.trim(),

                        surname: surname.trim(),

                        ranking: ranking,

                        country: country.trim(),

                        photo: photo,

                        progress: true,

                        approved: true,

                        myCalendar: myCalendar,

                        tags: tags,

                        skill: skill,

                        type: type,

                        sk: mobj,

                        acentSkill: skl

                      }



                      self.teacherResult.push(obj)

                    })

                  })

                })

              })

            })

          })

        })

      })

    }

  })



