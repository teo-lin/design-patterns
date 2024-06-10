// not best practice: not truly singleton when imported in two different ways
export class Singleton {
	private static instance: Singleton

	constructor() {
		if (!Singleton.instance) Singleton.instance = this
		return Singleton.instance
	}
}
