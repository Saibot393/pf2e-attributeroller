Hooks.on("renderActorSheetPF2e", (vApp, vHTML, vData) => {
	console.log("test");
	let vAttributeHTML = vHTML.find("section.character-attributes");
	
	vAttributeHTML.find("span").each(
		function () {
			let vReplacement = document.createElement('a');
			
			vReplacement.setAttribute("class", "rollable");
			
			vReplacement.setAttribute("title", this.getAttribute("title"));
			
			vReplacement.innerHTML = this.innerHTML;
			
			let vabilityId = this.innerHTML.toLowerCase();
			
			vReplacement.addEventListener("click", pevent=>{//adapted from pf2e code
				const cbonus = vApp.actor.system.abilities[vabilityId].mod;
				
				const vparts = ["@bonus"];
				
				const vtitle = game.i18n.localize(`PF2E.AbilityCheck.${vabilityId}`);
				
				const vdata = {
					bonus : cbonus
				}
				   
				const vspeaker = ChatMessage.getSpeaker({
					token: this.token,
					actor: this.actor
				});
				
				game.pf2e.Dice.d20Roll({
					event : pevent,
					parts : vparts,
					data : vdata,
					title : vtitle,
					speaker : vspeaker
				})
			});		

			this.replaceWith(vReplacement);
		}
	);
});